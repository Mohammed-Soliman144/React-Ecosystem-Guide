// import {useState} from "react"
// import { type taskType } from "./types/task-type"
// import { TaskComponent } from "./TaskComponent"
// export const ParentComponent = () => {
//     const [state, setState] = useState<Array<taskType>>([])

//     const handleState = (data: taskType) => {
//         setState(prev => {
//             return [
//                 ...prev,
//                 {...data}
//             ]
//         })
//     }

//     return <div className="container">
//         <TaskComponent state={state} handleState={handleState}/>
//     </div>

// }