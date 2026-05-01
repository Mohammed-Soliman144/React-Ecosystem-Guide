// import { useRef } from "react"
// import { type refType, FormChild } from "./FormChild"


// export const FormParent = () => {
//     const formRef = useRef<refType>(null)

//     return <form action="" className="parent-form">
//         <FormChild ref={formRef}>
//             <button type="button" onClick={() => formRef.current?.moveNext()}>Move Next</button>
//             <button type="button" onClick={() => formRef.current?.moveBack()}>Move Back</button>
//             <button type="button" onClick={() => formRef.current?.setMovement()}>Go To Last</button>
//         </FormChild>
//     </form>
// }