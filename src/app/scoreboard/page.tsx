import {getScoreboard} from "@/lib/scoreboard";
export const dynamic = "force-dynamic"

export default async function ScoreboardPage() {
    const scoreboard = await getScoreboard()
    return (
        <main className="p-8">
            <h1>scoreboard</h1>
            <table>
                <thead>
                    <tr><th>#</th><th>team</th><th>points</th></tr>
                </thead>
                <tbody>
                    {scoreboard.map((t, i) => (
                        <tr key={t.name}>
                            <td>{i + 1}</td>
                            <td>{t.name}</td>
                            <td>{t.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}