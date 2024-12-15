import '../../styles/pokemonList.css'

export default function pokemonsLayout({ children }) {
    return (
        <div className="pokemons">
            {children}
        </div>
    )
}