import {getCurrentTeam} from "@/lib/auth"
import {prisma} from "@/lib/prisma"
import {compare} from "bcryptjs"

export async function POST(req: Request) {
    const team = await getCurrentTeam()
    if (!team) return new Response("no current team", {status: 401})
    let body: any
    try {
        body = await req.json()
    } catch {
        return new Response("invalid JSON", {status: 400})
    }
    if (body === null)
        return new Response("missing challenge id or flag", {status: 400})
    let {challengeId, flag} = body
    if (!Number.isInteger(challengeId) || typeof flag !== "string")
        return new Response("invalid submission", {status: 400})
    flag = flag.trim()
    if (flag.length > 50)
        return new Response("flags are under 50 characters", {status: 400})
    const chall = await prisma.challenge.findUnique({where: {id: challengeId}})
    if (!chall) return new Response("invalid challenge id", {status: 404})
    if (
        await prisma.submission.findFirst({
            where: {teamId: team.id, challengeId: challengeId, correct: true},
        })
    )
        return Response.json({correct: true, alreadySolved: true})
    const oneminago = new Date(Date.now() - 60 * 1000)
    const recentWrong = await prisma.submission.count({
        where: {teamId: team.id, correct: false, submittedAt: {gte: oneminago}},
    })
    if (recentWrong >= 5)
        return new Response(
            "too many requests, wait a minute before submitting again",
            {status: 429},
        )

    const right = await compare(flag, chall.flagHash)
    await prisma.submission.create({
        data: {
            teamId: team.id,
            challengeId: chall.id,
            correct: right,
        },
    })
    return Response.json({correct: right}, {status: 200})
}
