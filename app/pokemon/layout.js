// app/pokemon/layout.js - pokemon list layout
import '../../styles/pokemonList.css'
import '../../styles/compare.css'

export default function pokemonsLayout({ children }) {
    return (
        <div className="pokemon">
            {children}
        </div>
    )
}