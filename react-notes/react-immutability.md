# what is React immutability
1. by default props (properties) are read only which its passing from parent to childs to display data (but can not modify it which its owned by parent) and also props are passing from up to down (by default downward).
2. all states in react are immutable must using immutable array methods and immutable object methods to handle its.
3. derived variables are derived values from props or states (result of props or states) by using keywords const or let (const used when changes values in each render (fine to avoid any TypeError) but let used when changes values more times within the same rendering)

```js
/*  
    Array Methods mutable
        push(), pop(), shift(), unshift(), fill(), copyWithin()
        array[index] = value, sort(), reverse(), splice()

    Array Methods immutable
        map(), filter(), some(), every(), reduce(),
        includes(), find(), findIndex(), slice(),
        toReversed(), toSorted(), toSpliced(), concat(), join(), with()

    Object Methods mutable
        object[key] = value, object.key = value
        delete object[key], delete object.key
        Object.assign(targetObject, sourceObject)
        object.defineProperty(object, 'key', {
            value: 20,
            writable: true,
            enumerable: true,
            configurable: true
        })

    Object Methods immutable
        {...obj1, key: value}
        {key, ...allObjectWithoutKey}
        {...obj1, ...obj2} or Object.assign({}, sourceObject1)
*/
```
---------------------------------------------------------------
| **Type of Method** |  **Array Methods (for React)** | **Object Methods (for React)** |
|--------------------|--------------------|--------------------|
| adding value | [...oldArr, newItem] | {...oldObj, key: item} |
| updating value| oldArr.map() or oldArr.with() | {...oldObj, key: item}|
| deleting value | oldArr.filter() or oldArr.toSpliced() | {deleteKey, ...restObj} |
| search value or index | oldArr.find() or oldArr.findIndex() | Object.values() then arr.find() |
| inserting value | oldArr.slice() or oldArr.toSpliced() | {...oldObj, key: value} |
| sorting | oldArr.toSorted() |  N/A Not Available |
| reversing | oldArr.toReversed() | N/A Not Available |
| merging | [...oldArr1, ...oldArr2] | {...oldObj1, ...oldObj2} or Object.assign({}, obj1, obj2) |
| replacing | [...oldArr1, ...oldArr2] | {...oldObj1, ...oldObj2} |
| transforming | oldArr.map() or oldArr.reduce | Object.fromEntries(Object.entries(oldObj).map()) |
---
