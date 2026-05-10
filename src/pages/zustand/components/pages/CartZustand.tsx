import { useEffect, useState } from "react"
import { useCartStore, type ICartStore } from "../../stores/shoppingStore"
import { resetCart } from "../../helper/resetCart"


export const CartZustand = () => {
    const items = useCartStore(state => state.cartData.items)
    // const vendors = useCartStore(state => state.cartData.vendors)
    const updateItem = useCartStore(state => state.actions.updateQty)
    const addItem = useCartStore(state => state.actions.addProd)
    const increment = useCartStore(state => state.actions.incrementQty)
    const decrement = useCartStore(state => state.actions.decrementQty)

    // Derived State or Derived Values
    const cartTotal = useCartStore(state => state.cartData.items.reduce((acc, item) => (acc + item.prodQty), 0))
    const cartCount = useCartStore(state => state.cartData.items.length)

    // Reset Form
    const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        resetCart()
    }
    // const cartTotal = useCartStore(state => state.actions.cartCount().total)
    const [product, setProduct] = useState({
        prodId: "",
        vendorId: "",
        prodName: "",
        prodQty: 0
    })

    // Subscribe to listen when
    useEffect(()=> {
        const selectorQty = (state: ICartStore) => state.cartData.items.reduce((acc, item)=> acc + item.prodQty, 0)
        const listener = (qty: number) => {
            if(qty > 20) {
                console.log(`your qty is greater than allowed 20 but qty ${qty}`)
            } else {
                console.log(`your qty in safe range boundries qty ${qty}`)
            }
        }
        // execute listenr at mounting phase when use fireImmediately: true
        const unSubscribe = useCartStore.subscribe(selectorQty, listener, {fireImmediately: true})

        return () => unSubscribe()
    }, [])
    return <div className="container">
        <form action="">
            <div className="form-controls">
                <label htmlFor="vendorId">
                    Vendor ID:
                </label>
                <input type="text" id="vendId" value={product.vendorId} onChange={(e) => setProduct(prev => ({...prev, vendorId: e.target.value}))} />
            </div>
            <div className="form-controls">
                <label htmlFor="prodId">
                    Product ID:
                </label>
                <input type="text" id="prodId" value={product.prodId} onChange={(e) => setProduct(prev => ({...prev, prodId: e.target.value}))} />
            </div>
            <div className="form-controls">
                <label htmlFor="prodName">
                    Product Name:
                </label>
                <input type="text" id="prodName" value={product.prodName} onChange={(e) => setProduct(prev => ({...prev, prodName: e.target.value}))} />
            </div>
            <div className="form-controls">
                <label htmlFor="Qty">
                    Qty:
                </label>
                <input type="text" id="Qty" value={product.prodQty} onChange={(e) => setProduct(prev => ({...prev, prodQty: Number(e.target.value) || 0}))} />
            </div>
            <div className="form-select">
                <label htmlFor="selectId">ProductName</label>
                <select name="productName" id="selectId" onChange={(e) => {
                    const item = items.find(item => item.prodId === e.currentTarget.value)
                    if(!item) return
                    setProduct(prev => ({
                        ...prev,
                        prodId: item?.prodId,
                        vendorId: item?.vendorId,
                        prodName: item?.prodName,
                        prodQty: item?.prodQty
                    }))
                }}>
                    {
                        items.map(item => (
                            <option value={item.prodId} key={item.prodId}>{item.prodName}</option>
                        ))
                    }
                </select>
            </div>
            <button type="button" onClick={(e) => {
                e.preventDefault()
                addItem(product)
            }}>Add New Item</button>
            <button type="button" onClick={(e) => {
                e.preventDefault()
                updateItem(product.vendorId, product.prodId, product.prodQty)
            }}>Update Item</button>
            <button type="button" onClick={(e) => {
                e.preventDefault()
                increment(product.prodId)
            }}>Add Qty +</button>
            <button type="button" onClick={(e) => {
                e.preventDefault()
                decrement(product.prodId)
            }}>Add Qty -</button>
            <p>count: {cartCount}</p>
            <p>total: {cartTotal}</p>
            <button type="button" onClick={handleReset}>Reset</button>
        </form>
        <ul>
            {
                items.map(item => (
                    <li key={item.prodId}>
                        <h2>{item.prodName}</h2>
                        <p>{item.prodQty}</p>
                    </li>
                ))
            }
        </ul>
    </div>
}