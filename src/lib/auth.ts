import {SignJWT, jwtVerify} from "jose";
import {prisma} from "@/lib/prisma";
import {cookies} from "next/headers";
const COOKIE_NAME = "auth";

if(!process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is not defined");
}

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

function generateToken(teamId: number) {
    return new SignJWT({teamId})
        .setProtectedHeader({alg: "HS256"})
        .setExpirationTime("7d")
        .sign(key);
}

export async function verifyToken(token: string) {
    try {
        const {payload} = await jwtVerify(token, key, {algorithms: ["HS256"]});
        if(!payload.teamId || typeof payload.teamId !== "number")
            throw new Error("invalid token");
        const team = await prisma.team.findUnique({where: {id: payload.teamId}, select: {id: true, name: true}});
        if(!team)
            throw new Error("invalid token");
        return team;
    }
    catch {
        throw new Error("invalid token");
    }
}

export async function getCurrentTeam() {
    const store = await cookies();
    const pass = store.get(COOKIE_NAME)?.value;
    if(!pass)
        return null;
    try {
        return await verifyToken(pass);
    }
    catch {
        return null;
    }
}

export async function startSession(teamId: number) {
    const token = await generateToken(teamId);
    const store = await cookies();
    store.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // just 7 days because i feel like that's enough like if you wanna be logged in for longer that's YOUR problem and YOU have to log in again lol
    });
}