import {getScoreboard} from "@/lib/scoreboard";

export async function GET() {
    return Response.json(await getScoreboard())
}