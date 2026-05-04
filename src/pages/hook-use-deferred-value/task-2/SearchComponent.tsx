export const SearchComponent = ({searchTerm, handleChange}: {searchTerm: string, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
    return <form action="" method="GET">
        <label htmlFor="search">
            Search Term:
        </label>
        <input type="text" id="search" name="search" value={searchTerm} onChange={handleChange}/>
    </form>
}