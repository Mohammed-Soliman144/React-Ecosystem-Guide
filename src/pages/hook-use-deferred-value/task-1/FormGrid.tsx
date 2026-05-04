export const FormGrid = ({inputSearch, handleChange}: {inputSearch: string, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
    return <form action="" method="GET" 
        className="search flex justify-start items-center gap-2 text-white font-bold bg-slate-900 rounded-md border border-white p-2">
        <label htmlFor="search">
            Search Words:
        </label>
        {/* instant input without any lagging by useState */}
        <input type="text" name="search" id="search" value={inputSearch} onChange={handleChange} className="outline-none"/>
    </form>
}