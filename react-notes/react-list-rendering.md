# What is List Rendering in React:
1. List Rendering represent when have duplicate pattern inside your UI for example when have array of cards that duplicating inside your app etc.
2. any list rendering must use unique identifier as key (key mandatory attribute) to make react apply diffing algorithms.
3. must key is unique identifier not index to avoid index trap suppose you delete one item inside array react can not know this still updating UI.


## Can use index as key only if existing conditions:
1. if array list is static which means items can not changed.
2. if array list can not sorting or filteration.
3. example navigation links inside header is fixed can use index.

```js
// diffing Algorithms 
/* 
    ["ahmed", "muhammad"]
    Actual DOM                     
    <ul>                                    
        <li key={0}>ahmed</li>
        <li key={1}>muhammad</li>
    </ul>

    suppose you add new item ["sayed", ...listNames]

*/
const ComponentOne = () => {
    const cards = [
        {
            id: 1,
            title: "Mac Book Air Pro+",
            price: 3000,
            description: "1000 GB SDD | 260 GB DRR5 RAM"
        }
        {
            id: 2,
            title: "Mac Book Air",
            price: 2000,
            description: "500 GB SDD | 130 GB DRR5 RAM"
        }
        {
            id: 3,
            title: "Mac Book",
            price: 1000,
            description: "15 GB SDD | 50 GB DRR5 RAM"
        }
    ]

    return <div className="container">
        {
            cards.map((card) => {
                return (
                    <article className="card" key={card.id}>
                        <h2>{card.title}</h2>
                        <p>Price: `$${card.price}`</p>
                        <p>description: {card.description}</p>
                    </article>
                )
            })
        }
    </div>
}
```
