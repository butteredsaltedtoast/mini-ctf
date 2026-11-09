export default function Secret() {
    return (
        <main className="p-8">
            <p>hey! {process.env.FLAG_WEB}</p>
        </main>
    )
}