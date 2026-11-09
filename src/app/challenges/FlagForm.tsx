"use client"
import {useState} from "react"

export default function FlagForm({challengeId}: {challengeId: number}) {
    const [flag, setFlag] = useState("")
    const [message, setMessage] = useState("")
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setMessage("")
        const res = await fetch("/api/submit", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({challengeId, flag})
        })
        if(!res.ok) {
            setMessage(await res.text())
            return
        }
        const data = await res.json()
        if(data.alreadySolved)
            setMessage("you already submitted this.")
        else if(data.correct)
            setMessage("correct! nice job!")
        else
            setMessage("incorrect, try again!")
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input className="border px-2 py-1" placeholder="terra{...}" value={flag} onChange={(e) => setFlag(e.target.value)}/>
            <button type="submit" className="border px-2 py-1">submit flag</button>
            {message && <p>{message}</p>}
        </form>
    )
}