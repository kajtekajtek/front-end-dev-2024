// app/pokemon/layout.js - pokemon list layout
import '../../styles/pokemonList.css'

export default function pokemonsLayout({ children }) {
    return (
        <div className="pokemon">
            {children}
        </div>
    )
}