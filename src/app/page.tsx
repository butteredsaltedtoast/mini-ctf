import Link from "next/link"

export default function Home() {
    return (
        <main className="flex flex-col gap-2 p-8">
            <h1>mini ctf</h1>
            <Link href="/register">register</Link>
            <Link href="/login">log in</Link>
            <Link href="/scoreboard">scoreboard</Link>
            <Link href="/challenges">challenges</Link>
            <div dangerouslySetInnerHTML={{__html: "<!-- crawlers aren't allowed everywhere, you know... -->"}} />
        </main>
    )
}