import { useCartStore } from "../stores/shoppingStore";

export function resetCart() {
    // the way to useStore as Vanilla JS must use getState
    const itemsCount = useCartStore.getState().cartData.items.length
    if(itemsCount) {
        useCartStore.setState(state => ({
            ...state,
            cartData: {
                ...state.cartData,
                items: []
            }
        }))
    }
    return `Shopping Cart is empty now items No = ${itemsCount}`
}