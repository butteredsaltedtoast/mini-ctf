import {prisma} from "@/lib/prisma";
import {hash} from "bcryptjs";
import {startSession} from "@/lib/auth";

export async function POST(req: Request) {
    let body: any;
    try {
        body = await req.json();
    }
    catch {
        return new Response("invalid JSON", {status: 400});
    }
    if(body === null)
        return new Response("missing team name or password", {status: 400});
    let {username, password} = body;
    if(typeof username !== "string" || typeof password !== "string")
        return new Response("missing team name or password", {status: 400});
    username = username.trim();
    if(username.length < 3 || username.length > 20)
        return new Response("team name must be between 3 and 20 characters", {status: 400});
    if(password.length < 8 || password.length > 72)
        return new Response("password must be 8 to 72 characters", {status: 400});
    if(!/^[a-zA-Z0-9_ ]+$/.test(username))
        return new Response("team name must only contain letters, numbers, spaces, and underscores", {status: 400});
    if(await prisma.team.findUnique({where: {name: username}}))
        return new Response("team name already taken", {status: 409});

    const hashedPassword = await hash(password, 10);
    let newTeam;
    try {
        newTeam = await prisma.team.create({
            data: {
                name: username,
                password: hashedPassword,
            }
        });
    }
    catch (error) {
        if(await prisma.team.findUnique({where: {name: username}}))
            return new Response("team name already taken", {status: 409});
        console.error(error);
        return new Response("error creating team", {status: 500});
    }
    await startSession(newTeam.id)
    return Response.json({ok: true}, {status: 201});
}