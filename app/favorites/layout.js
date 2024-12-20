// app/favorites/layout.js - favorites list layout
import '../../styles/pokemonList.css'
import '../../styles/compare.css'

export default function favoritesLayout({ children }) {
    return (
        <div className="favorites">
            {children}
        </div>
    )
}