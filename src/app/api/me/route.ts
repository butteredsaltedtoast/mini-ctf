import {getCurrentTeam} from "@/lib/auth"

export async function GET() {
    const team = await getCurrentTeam()
    if (!team) return new Response("no current team", {status: 401})
    return Response.json(team)
}
