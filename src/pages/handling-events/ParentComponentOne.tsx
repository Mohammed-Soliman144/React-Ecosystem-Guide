import { SubParentComponent } from "@/pages/handling-events/SubParentComponent"

export const ParentComponentOne = () => {
    const products = [
        {item: "Mac Book", price: 2000},
        {item: "Mac Book Pro+", price: 2500},
        {item: "Mac Book Pro+ Ultra", price: 3000},
        {item: "Mac Book Pro+ Ultimated", price: 5000},
    ]
    const handleClick = (item: string, price: number) => {
        const msg = `Item Name is ${item} and Total Price $${price}`;
        console.log(msg);
        alert(msg);
    }
    return (
        products.map((prod, idx) => 
            <SubParentComponent key={idx} item={prod.item} price={prod.price} handleClick={() => handleClick(prod.item, prod.price)}>
            </SubParentComponent>
        )
    )
}

