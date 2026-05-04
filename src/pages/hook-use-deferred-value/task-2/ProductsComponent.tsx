import {useDeferredValue, useState, useCallback, useMemo} from "react"
import { SearchComponent } from "./SearchComponent"
import { Products } from "./Products"

export type productType = {
    id: number,
    name: string,
    price: number,
    hasDiscount: boolean,
    discount?: number
}

const productsList: Array<productType> = Array.from({length: 5000}, (_, idx) => {
    return {
        id: idx + 1,
        name: `Product-${idx+1}`,
        price: parseFloat(Number(10.88 * ((idx + 1) % 100)).toFixed(3)),
        hasDiscount: idx%2 === 0,
        discount: idx%2 === 0 ? parseFloat(Number(2.45 * ((idx + 1) % 100)).toFixed(2)) : 0
    }
})

export const ProductsComponent = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const deferredSearchTerm = useDeferredValue(searchTerm)
    const isTyping = searchTerm !== deferredSearchTerm 

    const deferredFilterProducts = useMemo(() => {
        const result = productsList.filter(prod => prod.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()) || prod.id === parseInt(deferredSearchTerm))
        return result.length > 20 ? result.slice(0, 20) : result
    }, [deferredSearchTerm])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }, [])

    return <section className="">
        <SearchComponent searchTerm={searchTerm} handleChange={handleChange} />
        <Products deferredFilterProducts={deferredFilterProducts} isTyping={isTyping}/>
    </section>
}