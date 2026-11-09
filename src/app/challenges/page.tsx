import {getCurrentTeam} from "@/lib/auth";
import {redirect} from "next/navigation"
import {prisma} from "@/lib/prisma"
import FlagForm from "./FlagForm"

export default async function ChallengesPage() {
    const team = await getCurrentTeam()
    if(!team)
        redirect("/login")
    const challenges = await prisma.challenge.findMany({select: {id: true, title: true, description: true, category: true, points: true, fileUrl: true}})
    return (
        <main className="flex flex-col gap-6 p-8">
            <h1>challenges</h1>
            {challenges.map((c) => (
                <div key={c.id}>
                    <h2>{c.title} - {c.category} - {c.points} points</h2>
                    <p>{c.description}</p>
                    {c.fileUrl && <a href={c.fileUrl} download>download</a>}
                    <FlagForm challengeId={c.id}/>
                </div>
            ))}
        </main>
    )
}