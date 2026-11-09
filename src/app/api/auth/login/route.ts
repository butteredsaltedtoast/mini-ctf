import {prisma} from "@/lib/prisma"
import {hashSync, compare} from "bcryptjs"
import {startSession} from "@/lib/auth"
const DUMMY_HASH = hashSync("n0t-a-r3al-pin6767", 10)

export async function POST(req: Request) {
    let body: any
    try {
        body = await req.json()
    } catch {
        return new Response("invalid JSON", {status: 400})
    }
    if (body === null)
        return new Response("missing team name or password", {status: 400})
    let {username, password} = body
    if (typeof username !== "string" || typeof password !== "string")
        return new Response("missing team name or password", {status: 400})

    username = username.trim()
    const team = await prisma.team.findUnique({where: {name: username}})
    const hash2check = team ? team.password : DUMMY_HASH
    const ok = await compare(password, hash2check)
    if (!team || !ok)
        return new Response("invalid team name or password", {status: 401})

    await startSession(team.id)
    return Response.json({ok: true}, {status: 200})
}
