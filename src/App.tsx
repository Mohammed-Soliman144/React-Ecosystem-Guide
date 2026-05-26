import ComponentThree, 
  { ComponentOne, 
    ComponentTwo, 
    ComponentFour, 
    ComponentFive } 
    from './pages/ComponentOne'
import { Alert } from '@/pages/module-style/Alert'
import { ParentComponentOne } from './pages/handling-events/ParentComponentOne'
import { ParentComponentTwo } from './pages/handling-events/ParentComponentTwo'
import { Counter } from './pages/states/Counter'
import { StateWithObject } from './pages/states/StateWithObject'
import { StateWithArray } from './pages/states/StateWithArray'
import { ShoppingCart } from './pages/states/ShoppingCart'
import { CounterReducer } from './pages/reducer/CounterReducer'
import { ShoppingCartReducer } from './pages/reducer/ShoppingCartReducer'
import { CounterLazy } from './pages/reducer/CounterLazy'
import {ShoppingCardWithReducer} from "@/pages/reducer/ShoppingCardWithReducer"
import { UsetPreferences } from './pages/context/UserPreferences'
import './App.css'
import { TimerComponent } from './pages/refs-hook/TimerComponent'
import { InputFocus } from './pages/refs-hook/InputFocus'
import { ChangeDocumentTitle } from './pages/useEffect-hook/ChangeDocumentTitle'
import { MouseMove } from './pages/useEffect-hook/MouseMove'
// import { ComponentA } from './pages/useEffect-hook/ComponentA'
import { Users } from './pages/useEffect-hook/case-1/Users'
import { FormComponent } from './react-hook-form/form-1/FormComponent'
// import { Modal } from './pages/hook-useId-useImprativeHandle/Modal'
import { UsersForm } from './react-hook-form/form-2/UsersForm'
// import { Profile } from './react-hook-form/form-1/ZodForm'
import { OptimisticComponent } from './pages/optimistic-hook/OptimisticComponent'
// import { LoginForm } from './pages/hook-use-action-state/LoginForm'
import { TaskComponent } from './pages/optimistic-hook/task-1/TaskComponent'
import { ParentComponent } from './pages/useImperativeHandle-hook/task-1/ParentComponent'
// import { FormParent } from './pages/useImperativeHandle-hook/task-3/FormParent'
import { ResizeComponent } from './pages/useSyncExternalStore/task-1/ResizeComponent'
import { OnlineComponent } from './pages/useSyncExternalStore/task-2/OnlineComponent'
import { CounterComponent } from './pages/useSyncExternalStore/task-3/CounterComponent'
import { HybirdCounterComponent } from './pages/useSyncExternalStore/task-4/HybirdCounterComponent'
import { TooltipComponent } from './pages/hook-use-layout-effect/task-1/TooltipComponent'
import { AdvertisesBanner } from './pages/hook-use-layout-effect/task-2/AdvertisesBanner'
import { HeaderComponent } from './pages/hook-use-layout-effect/task-2/HeaderComponent'
import { ParentGrid } from './pages/hook-use-deferred-value/task-1/ParentGrid'
import { ProductsComponent } from './pages/hook-use-deferred-value/task-2/ProductsComponent'
import { FormMainComponent } from './pages/hook-use-id/FormComponent'
import { ProductsList } from './pages/react-api-use/task-1/ProductList'
import { TestComponent } from './pages/custom-hook/test/TestComponent'
import { UsersZustand } from './pages/zustand/components/pages/UsersZustand'
import { CartZustand } from './pages/zustand/components/pages/CartZustand'
import { UseEffectPosts } from './react-query/pages/UseEffectPosts'

function App({className}: {className: string}) {
  return (
    <>
    <div className={className}>
      <Users />
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
      <ComponentFour />
      <ComponentFive />
      <Alert>
        <p>Your changes have been saved!</p>
      </Alert>
      <button className='error-special'>click here</button>
      <hr />
      <ParentComponentOne />
      <ParentComponentTwo />
      <Counter />
      <hr />
      <StateWithObject />
      <StateWithArray />
      <hr />
      <ShoppingCart />
      <hr />
      <CounterReducer />
      <hr />
      <div className='w-full h-10 bg-red-500'></div>
      <ShoppingCartReducer />
      <div className='w-full h-10 bg-red-500'></div>
      <CounterLazy />
      <div className='w-full h-10 bg-red-500'></div>
      <div className='w-full h-10 bg-red-500'></div>
      <ShoppingCardWithReducer />
      <div className='w-full h-10 bg-red-500'></div>
      <div className='w-full h-10 bg-red-500'></div>
      <UsetPreferences />
      <div className='w-full h-10 bg-red-500'></div>
      <TimerComponent />
      <InputFocus />
      <div className='w-full h-10 bg-red-500'></div>
      <ChangeDocumentTitle/>
      <div className='w-full h-10 bg-red-500'></div>
      <MouseMove />
      <div className='w-full h-10 bg-red-500'></div>
      {/* <ComponentA />  */}
      {/* <Modal /> */}
      <div className='w-full h-10 bg-red-500'></div>
      <FormComponent />
      <div className='w-full h-10 bg-red-500'></div>
      <UsersForm />
      <div className='w-full h-10 bg-red-500'></div>
      {/* <Profile /> */}
      <div className='w-full h-10 bg-red-500'></div>
      <OptimisticComponent />
      <div className='w-full h-10 bg-red-500'></div>
      {/* <LoginForm /> */}
      <div className='w-full h-10 bg-red-500'></div>
      <TaskComponent />
      <div className='w-full h-10 bg-red-500'></div>
      <ParentComponent />
      <div className='w-full h-10 bg-red-500'></div>
      {/* <FormParent /> */}
      <div className='w-full h-10 bg-red-500'></div>
      <ResizeComponent />
      <div className='w-full h-10 bg-red-500'></div>
      <OnlineComponent />
      <div className='w-full h-10 bg-red-500'></div>
      <CounterComponent />
      <div className='w-full h-10 bg-red-500'></div>
      <div className='w-full h-10 bg-red-500'></div>
      <HybirdCounterComponent />
      <div className='w-full h-10 bg-red-500'></div>
      <TooltipComponent />
      <div className='w-full h-10 bg-red-500'></div>
      {/* <HeaderComponent/> */}
      <div className='w-full h-10 bg-red-500'></div>
      <ParentGrid/>
      <div className='w-full h-10 bg-red-500'></div>
      <ProductsComponent />
      <div className='w-full h-10 bg-red-500'></div>
      <FormMainComponent /> 
      <div className='w-full h-10 bg-red-500'></div>
      {/* <ProductsList /> */}
      <div className='w-full h-10 bg-red-500'></div>
      <TestComponent  />
      <div className='w-full h-10 bg-red-500'></div>
      <UsersZustand />
      <div className='w-full h-10 bg-red-500'></div>
      <CartZustand />
      <UseEffectPosts/>
    </div>
    </>
  )
}

export default App
