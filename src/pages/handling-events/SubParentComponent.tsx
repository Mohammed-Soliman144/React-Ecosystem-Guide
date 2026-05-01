import { CustomCard } from "@/pages/handling-events/CustomCard"

export const SubParentComponent = ({item, price, handleClick}: {item: string, price: number, handleClick: () => void}) => {
    return <CustomCard item={item} price={price} handleClick={handleClick}>
        <span>Order Now!</span>
    </CustomCard>
}
