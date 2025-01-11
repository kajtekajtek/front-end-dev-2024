// app/pokemon/[id]/layout.js - pokemon details layout
import Link from 'next/link';
import '../../../styles/pokemonDetails.css'
import '../../../styles/addNoteForm.css'


export default function pokemonDetailsLayout({ children }) {
    return (
        <div className="pokemonDetails">
            <nav className="breadcrumbs">
                <ul>
                    <Link href="/">Home</Link> &gt;
                    <Link href="/pokemon"> Pokemon List</Link> &gt; 
                    <span> Pokemon Details</span>
                </ul>
            </nav>
            {children}
        </div>
    )
}