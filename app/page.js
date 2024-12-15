// app/page.js - home page 
import Link from 'next/link';

export default function HomePage() {
    return (
        <>
            <section className="header">
                <h1>Welcome to Game Dex</h1>
                <Link href="/pokemon">
                    <button>Go to Pokemon list</button>
                </Link>
            </section>
        </>
    )
}