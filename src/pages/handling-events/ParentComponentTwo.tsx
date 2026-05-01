import { SubParentComponent } from "@/pages/handling-events/SubParentComponent"

export const ParentComponentTwo = () => {
    const products = [
        {item: "Iphone 16 pro", price: 45000},
        {item: "Iphone 16 pro+", price: 7000},
        {item: "Iphone 16 pro+ Gold", price: 13000},
        {item: "Iphone 16 pro+ Gold & Accessories", price: 15000},
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