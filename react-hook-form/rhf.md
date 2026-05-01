# React Hook Form
- react hook form with integration with zod library is industry standards in job market which is more performent which rhf depends on ref inside controlled component not useState (to prevents unnecessary rerender in react)

## React Hook Form Installation (RHF)
```js
// install react hook form
npm install react-hook-form
// install devtools for react hook form
npm install -D @hookform/devtools 
```

## How To use React-hook-form
```js
import {useForm} from "react-hook-form"

type formType = {
    name: string,
    email: string
}

export const SimpleForm = () => {
    /* 
        -- destructuring {register, handleSubmit, formState } from useForm()
        -- const {register, handleSubmit, formState } = useForm<formType>()
        -- const {ref, onChange, onBlur, name} = register
        <input type="text" ref={ref} onChange={handleChange} onBlur={handleBlur} name={name} />
        OR
        <input type="text" {...register("NameOfInput or NameOfHTMLFormElement")} />

        // For Validation Form
        // required string (simplify)
        {...register("NameOfInput or NameOfHTMLFormElement", 
             {required: "invalidMessageAsStringOfEmpty"}
        )}
        OR required object
        {...register("NameOfInput or NameOfHTMLFormElement", 
            {   
               required:{
                    value: boolean | string,
                    message: "invalidMessageAsStringOfEmpty"
               }
            }
        )}
        
        OR pattern object
        {...register("NameOfInput or NameOfHTMLFormElement", 
            {   
               pattern:{
                    value: /^[A-Za-z0-9%_+.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ig , => accepts regular expression
                    message: "invalid Email"
               } 
            }
        )}

        // Custom Validation of input validate as object for multiple validations rule or validate as callback function
        {...register("NameOfInput or NameOfHTMLFormElement",  
            {   
               required:{
                    value: true => means is required input || false => not required,
                    message: "invalidMessageAsStringOfEmpty"
               },
                validate: (input) => {
                    return input !== "zzzzaid" || "must name does not contain name as like this zzzzaid"
                }
            }
        )}
        
        OR
        {...register("NameOfInput or NameOfHTMLFormElement", 
            {   
               required:{
                    value: true => means is required input || false => not required,
                    message: "invalidMessageAsStringOfEmpty"
               },
                validate: {
                    // function always or must return true (not void undefined)
                    validateRule1: (input) => {
                        return input !== "zzzzaid" || "must name does not contain name as like this zzzzaid"
                    },
                    // function always or must return true (not void undefined)
                    validateRule2: (input) => {
                        return input !== "azaz" || "invalid input"
                    }
                }
            }
        )}

        // Handle Appearing Custom Message for UI from formState
        // destructuring error object from formState
        const {errors} = formState
        
        => then inside jsx appear the error
        <div className="form-controls">
            <input type="email" />
            <p className="text-red-600">{errors.email.busemail?.message}</p>
        </div>

        // Form Submittion
        const handleSubmittion = (formData: formType) => {
            // your logic to deal with formData when submission
            console.log(formData)
        }
        <form action="ResoucerHandlerEndPoint" method="GET" onSubmit={handleSubmit(handleSubmittion)} >
            <button type="submit">submit</button>
        </form> 
    */
    const {register, handleSubmit, formState, control} = useForm();

}
```