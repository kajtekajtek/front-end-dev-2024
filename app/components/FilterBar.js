// app/components/Filters.js - filters component
export default function Filters({ filter, setFilter }) {
    return (
        <div className="filter-bar">
                <label htmlFor="type-filter">Filter by Type:</label>
                <select id="type-filter" value={filter} onChange={setFilter}>
                    <option value="">All</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                    <option value="electric">Electric</option>
                    <option value="psychic">Psychic</option>
                    <option value="ice">Ice</option>
                    <option value="dragon">Dragon</option>
                    <option value="dark">Dark</option>
                    <option value="fairy">Fairy</option>
                </select>
            </div>
    );
}