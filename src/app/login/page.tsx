"use client"
import {useState} from "react"
import {useRouter} from "next/navigation"

export default function LoginPage() {
    const [teamName, setTeamName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: teamName, password: password})
            })
            if(!res.ok) {
                setError(await res.text())
                return
            }
            router.push("/challenges")
        }
        finally {
            setLoading(false)
        }
    }
    return (
            <form onSubmit={handleSubmit}>
            <input className="border px-2 py-1" placeholder="team name" value={teamName} onChange={(e) => setTeamName(e.target.value)}/>
            <input className="border px-2 py-1" placeholder="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" disabled={loading}>{loading ? "loading..." : "log in"}</button>
            {error && <p>{error}</p>}
            </form>
        )
}