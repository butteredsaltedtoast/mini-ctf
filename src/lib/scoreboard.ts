import {prisma} from "@/lib/prisma"

export async function getScoreboard() {
    const teams = await prisma.team.findMany({
        select: {
            name: true,
            submissions: {
                where: {correct: true},
                select: {challenge: {select: {points: true}}, challengeId: true, submittedAt: true},
            },
        },
    })
    const scores = teams.map((t) => {
        const solves = new Set<number>()
        let points = 0
        let lastSolve = null
        for(const submission of t.submissions) {
            if(solves.has(submission.challengeId))
                continue
            solves.add(submission.challengeId)
            points += submission.challenge.points
            if(lastSolve === null || submission.submittedAt > lastSolve)
                lastSolve = submission.submittedAt
        }
        return {name: t.name, points, lastSolve}
    })
    return scores.sort((a, b) => b.points - a.points || (a.lastSolve?.getTime() ?? Infinity) - (b.lastSolve?.getTime() ?? Infinity))
}
