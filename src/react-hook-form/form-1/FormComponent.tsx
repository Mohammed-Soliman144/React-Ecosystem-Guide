import {useForm, useFieldArray, type FieldErrors} from "react-hook-form"
import {DevTool} from "@hookform/devtools"
import {useId, useEffect} from "react" // , useRef


interface Iusers {
  id: 1,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string,
  }
}


let performantCounter = 0;

type formType = {
    username: string,
    name: {
        first: string,
        middle: string,
        last: string
    },
    email: {
        busemail: string,
        peremail: string
    },
    channel: string,
    addresses: string[],
    phoneNumbers: {
        id: number
        number: string,
    }[],
    age: number,
    dob: Date,
    family: string,
    surName: string,
    famous: string
}
export const FormComponent = () => {
    const id = useId();

    // useForm() method imported from react-hook-form (import name)
    // return one object as instance contains many methods with multi functionality
    // must useFrom<theSameType>() === handleSubmittion(formData: formType)
    // const form = useForm<formType>();
    // console.log(form);

    performantCounter++;
    // extract key register from form instance which contains many values like
    // onChange, ref, onBlur, name which means destructuring all keys from it instead onChange()
    // register("inputName|htmlFormElementName")
    // const {register, control, handleSubmit, formState} = form;
    const {register, control, handleSubmit, formState, watch, getValues, setValue, reset, trigger} = useForm<formType>({
        defaultValues: {
            username: "",
            name: {
                first: "",
                middle: "",
                last: ""
            },
            email: {
                busemail: "",
                peremail: ""
            },
            channel: "",
            addresses: ["Cairo, Egppt", "Alexanderia, Egypt"],
            phoneNumbers: [
                {id: 1, number: "+200122556656566"}
            ],
            age: 33,
            dob: new Date("1/1/2023"),
            family: "",
            surName: "",
            famous: "Muhammed",
        },
        /* mode of validataion
            useForm<formType>({defaultValues: {}, mode: "onSubmit" || "onChange" || "onBlur" || "onTouched" || "all" })
            // onSubmit => default value within submitting form check validation of form
            // onChange => on each change in each input check validation triggers react rerender on each change(not best practice)
            // onBlur => when user focus on input the blur out the input check validation
            // onTouched => on first focus on the input + on blur the input check validation between them no validation
            // all => onChange + onBlur trigger validation on user blur the input and validation on each keystrokes on each change in input
            // Best Practice onSubmit or onBlur in the most cases
        */ 
        mode: "onSubmit"
    });
    // destructuring {errors, touchedFields, dirtyFields, isDirty }from formState
    const {errors, touchedFields, dirtyFields, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount} = formState;

    console.log(`touchedFields is (as object datatype) destructuring key from formState (as key destructuring from useForm() which represented all fields inside form - if touched any one change state to true) => ${touchedFields}`)

    console.log(`dirtyFields is (as object datatype) destructuring key from formState (as key destructuring from useForm() which represented all fields inside form - if change any fieldValue from defaultValue so change state to true) => ${dirtyFields}`)

    console.log(`isDirty is (as boolean datatype) destructuring key from formState (as key destructuring from useForm() which represented state of the whole form if touch any value inside it change to true => ${isDirty}`)

    console.log("isSubmitting, isSubmitted, isSubmitSuccessful and submitCount are destructuring from formState as the key destructuring from useForm() function (instance from import name rhf)")
    console.log("isSubmitting is boolean value descibe the status of form within submitting in this moment will be true and the default value is false which means isSubmitting before and submitting the form is false but within the same moment submitting form is true also isSubmitting value is used to check disabled submit button within submitting", isSubmitting);

    console.log("isSubmitted is boolean value descibe the status of form after submitting the form will be true and default value is false which means isSubmitted value before and within submitting form is false and after submitted form will be true", isSubmitted)

    console.log("isSubmitSuccessful is boolean value describe the status of form after submittion form with free runtime errors in this case is true and before and within submitting will be false and this value used for handle reset method which must check if form is submitted with no any runtime error", isSubmitSuccessful)

    console.log("submitCount is a simple counter used for counting the number of attempts that submitting form in it and default value is 0 as usually", submitCount)
    

    /* 
        now when use value with any input in react , so react expects this is controlled component until you do not create useState and onChange so must use defaultValue to tell react this is uncontrolled component or useState and onChange and value={state} as controlled Component? seconds useFieldArray used for dynamic fields in form also its can accept array of any thing as datatype also can accept name: {first: '', second: ''}[] ? also useFieldArray has already automatically field id generated by default so do not concerns about id for first index name: {first: '', last: ''}? all of them correct
    */
    // Destructuring fields from useFieldArray hook from rhf to deals with dynamic fields
    // useFieldArray({name: "inputFieldNameAsFormType", control: controlForDevToolOnly})
    const {fields, remove, append} = useFieldArray({name: "phoneNumbers", control: control});


    // so form event onSubmit accepts function handleSubmit that destructuring from useForm()
    // and handleSubmit(handleSubmittion, handleErrors) accepts to function one for hanldeSubmittion and second is handleErrors
    // handleSubmission(formDate: formType) accepts formDate as formType (not FormData)
    // handleErrors(formError: FieldErrors<formType>) accept type FieldErrors<genericTypeOfForm>
    // FieldErrors is type import from name react-hook-form 
    const handleSubmittion = (formData: formType) => {
        console.log("clicked =>",formData)
    }

    const handleErrors = (formErrors: FieldErrors<formType>) => {
        console.log("all form errors", formErrors)
    }

    // watch depends on useState and onChange as a controlled component against performant
    // used to display the value of field directly within typing onChange event
    const watchAge = watch("age")
    const watchFields = watch(["dob", "email.busemail", "email.peremail"])
    const watchForm = watch()

    // useEffect with watch to avoid extra rerendering to enhance performance and prevents rerendering
    // const watchEmailRef = useRef<{email: {busemail: "", peremail: ""}}>({email: {busemail: "", peremail: ""}})
    useEffect(()=>{
        // if(!watchEmailRef.current) return
        const watchFormData = watch((value, {name, type})=> {
            if(name === "email" && type === "change") {
                console.log(value.email?.peremail)
                console.log(value.age)
            }
                // if(watchEmailRef.current !== null)
                    // watchEmailRef.current?.email = value.email!
        })
        return () => {
            watchFormData.unsubscribe();
        }
    },[watch])

    // the best practice to handle reset form inside useEffect which useEffect runs after react render
    // that ensure and confirm as gurantee that form is already submitted
    useEffect(() => {
        // if form is already submitted and form free runtime error in this case can reset it
        if(isSubmitSuccessful)
            reset();
    }, [isSubmitSuccessful, reset])

    // getValues() is as watch() function but its not triggers react rerenders
    // getValues() === watch()
    const handleGetValues = () => {
        console.log(getValues());
        console.log(getValues("email"));
        console.log(getValues("email.busemail"));
        console.log(getValues("email.peremail"));
    }

    // note setValue is triggers react to rerender
    const handleSetValueWithChangeStates = () => {
        setValue("channel", "Microdata 2026", {
            // change states to true of field
            // apply validation rules after setter function
            shouldValidate: true,
            // apply change state of touch based on setter (as user focus on it for both type inside input or not) after setter function 
            // (any touch of field change state to true)
            shouldTouch: true,
            // apply change state of dirty based on setter (when user type on character at least inside input will change to true) 
            // (any change of field value does not equal defaultValue change to true)
            shouldDirty: true
        })
    }

    const handleSetValueWithoutChangeStates = () => {
        setValue("name", {first: "Mohammed", last: "Mostafa", middle: "Omar"})
    }
    return (
        <div className="container">
            <h2>Youtube Form Channel - {(performantCounter / 2)} </h2>
            <form action="" onSubmit={handleSubmit(handleSubmittion, handleErrors)} noValidate>
                <div className="form-controls">
                    <label htmlFor="username">Name:</label>
                    <input type="text" id="username" {...register("username",{required: "Must fill out this field"})}/>
                    {/* display error.username?.message === {required: "Must fill out this field"} */}
                    <p className="text-red-500">{errors.username?.message}</p>
                </div>
                <div className="form-controls">
                    <label htmlFor="first">first Name:</label>
                    <input type="text" id="first" {...register("name.first",{required: {
                        value: true,
                        message: "Must fill out this field"
                    } })}/>
                    <p className="text-bold text-red-700">{errors.name?.first?.message}</p>
                </div>
                <div className="form-controls">
                    <label htmlFor="middle">middle Name:</label>
                    <input type="text" id="middle" {...register("name.middle",{required: {
                        value: false,
                        message: "Must fill out this field"
                    } })}/>
                    <p className="text-bold text-red-700">{errors.name?.middle?.message}</p>
                </div>
                <div className="form-controls">
                    <label htmlFor="last">last Name:</label>
                    <input type="text" id="last" {...register("name.last",{pattern: {
                        value: /^(mr\.|ms\.|mrs\.)\s?[A-Za-z]+$/i,
                        message: "Last name must be in this pattern starts with mr. | ms. | mrs."
                    }})}/>
                    <p className="text-bold text-red-700">{errors.name?.last?.message}</p>
                </div>
                <div className="form-controls">
                    <label htmlFor="busemail">Business Email</label>
                    <input type="email" id="busemail" {...register("email.busemail", 
                    {   pattern: {
                            value: /^[A-Za-z0-9%+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                            message: "Invalid Email"
                        },
                        validate: (input) => {
                            return input !== "mohammed@gmail.com" || "the email is blocked from our system"
                        }
                    })} />
                    <p className="text-bold text-red-700">{errors.email?.busemail?.message}</p>
                </div>
                <div className="form-controls">
                    <label htmlFor="peremail">Personel Email</label>
                    <input type="email" id="peremail" {...register("email.peremail", {
                        pattern: {value: /^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/, message: ""},
                        validate: {
                            blockMail: (input) => {
                                return input !== "ahmed@gmail.com" || "the email is suspended from our system"
                            },
                            badDomain: (input) => {
                                return !input.includes("@baddomain.com") || "invalid domain name"
                            },
                            /* async validation function Note */
                            checkAsyncValidate: async (thisField) => {
                                try {
                                    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
                                        method: "GET",
                                        headers: {"CONTENT-TYPE": "application/json"}
                                    })
                                    if(!res.ok) {
                                        console.log(`HTTP Error Status code ${res.status} and status ${res.statusText}`)
                                        return `HTTP Error Status code ${res.status} and status ${res.statusText}`
                                    }
                                    const users: Array<Iusers> = await res.json()
                                    // console.log(users)
                                    // console.log(users.filter(user => user.email === getValues("email.peremail")))
                                    // console.log(users.filter(user => user.email === getValues("email.peremail")) ? true :  "Invalid Async Email")
                                    // console.log((users.filter(user => user.email === getValues("email.peremail")) && true )|| "Invalid Async Email")
                                    // console.log("is email is => ",(users.filter(user => user.email === getValues("email.peremail"))[0].email ===  getValues("email.peremail") && true) || "Invalid Async Email")
                                    const result = users.some(user => user.email === thisField)
                                    return result || "Invalid Async Email"
                                } catch(err) {
                                    console.log(`Network Error or Parsing Error - ${err}`)
                                    return `Network Error or Parsing Error - ${err}`
                                }
                            }
                        }
                    })} />
                    <p className="text-bold text-red-700">{errors.email?.peremail?.message}</p>
                </div>
                <div className="form-controls">
                    <label htmlFor="channel">Channel Name:</label>
                    <input type="text" id="channel" {...register("channel")}/>
                </div>
                <div className="form-controls">
                    <label htmlFor={`address1-${id}`}>Address One:</label>
                    <input type="text" id={`address1-${id}`} {...register("addresses.0")}/>
                    <label htmlFor={`address2-${id}`}>Address Two:</label>
                    <input type="text" id={`address2-${id}`} {...register("addresses.1")}/>
                </div>
                <div className="phones-numbers">
                    {
                        fields.map((field, index) => {
                            return (
                                <div className="form-controls" key={field.id}>
                                    <label htmlFor={`number-${index}-${id}`}>Number-{index + 1}</label>
                                    <input type="hidden" {...register(`phoneNumbers.${index}.id`)} />
                                    <input type="text" id={`number-${index}-${id}`} defaultValue={field.number} {...register(`phoneNumbers.${index}.number` as const)}/>
                                    <button type="button" onClick={() => remove(index)}>remove</button>
                                </div>
                            )
                        })
                    }
                    <button type="button" 
                    onClick={() => append({id: fields.length > 0 ? fields[fields.length - 1].id + 1 : 1,number: ""})}>Add New Nubmer or Append</button>
                </div>
                <div className="form-controls">
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" {...register("age", {
                        // can not use pattern with regular expression with valueAsNumber or valueAsDate
                        valueAsNumber: true,
                        required: "this field is required",
                    })}/>
                </div>
                <div className="form-controls">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input type="date" id="age" {...register("dob", {
                        valueAsNumber: true,
                        required: "this field is required",
                    })}/>
                </div>
                <div className="form-watch-values">
                    <p>{watchAge}</p>
                    <hr />
                    {
                        watchFields.map((field, index) => <p key={index}>{typeof field !== "string"? new Date(field).toDateString() : field}</p>)
                    }
                    <hr />
                    <p>{JSON.stringify(watchForm)}</p>
                    {/* <p>Business Email: {watchEmailRef.current?.email?.busemail}</p> */}
                    {/* <p>Personnel Email: {watchEmailRef.current?.email?.peremail}</p> */}
                </div>
                <button type="button" onClick={handleGetValues}>getValues</button>
                <button type="button" onClick={() => console.log(getValues("phoneNumbers"))}>get PhoneNumbers</button>
                <button type="button" onClick={()=> console.log(getValues("name"))}>get Name</button>
                
                <button type="button" onClick={handleSetValueWithChangeStates}>set channel with change states</button>
                <button type="button" onClick={handleSetValueWithoutChangeStates}>set Name without change states</button>
                <button type="button" onClick={()=> setValue("phoneNumbers.0",{id: 12, number: "+2001021212454"})}>Set Phone Number</button>

                <div className="form-controls">
                    <label htmlFor="family">Family Name:</label>
                    {/* disabled attribute in jsx is meaning fieldValue === undefined but not disabled validation rules which means RHF will try to validate field and can block submit the form */}
                    <input type="text" id="family"  {...register("family",{required: "Must fill out this Family Field"})}/>
                    <p className="text-red-500">{errors.family?.message}</p>
                    <label htmlFor="surname">SurName:</label>
                    {/* disabled key in register function is meaning fieldValue === undefined and required === false (disabled validation) - RHF is ignored validation of field and can submit form fine */}
                    <input type="surname" id="surname" {...register("surName",
                        {
                            required: "Must fill out this SurName Field",
                            // static
                            disabled: true
                        })}/>
                    {/* display error.username?.message === {required: "Must fill out this field"} */}
                    <p className="text-red-500">{errors.surName?.message}</p>
                    <label htmlFor="famous">Famous Name:</label>
                    {/* disabled key in register function is meaning fieldValue === undefined and required === false (disabled validation) - RHF is ignored validation of field and can submit form fine */}
                    <input type="famous" id="famous" {...register("famous",
                        {
                            required: "Must fill out this famous Field",
                            // dynamic
                            disabled: watch("famous") === ""
                        })}/>
                    {/* display error.username?.message === {required: "Must fill out this field"} */}
                    <p className="text-red-500">{errors.famous?.message}</p>
                </div>
                
                {/* To Hanlde Disabled submit button => you must desturcturing isDirty (if the whole form not touch any field equals true) and isValid (if any required input is not invalid equal false) on disabled attribute for submit button to stopping submit form when you need */}
                <button type="submit" className="disabled:bg-red-500 disabled:text-black disabled:cursor-not-allowed cursor-pointer p-2 rounded-md bg-green-500 text-white" disabled={!isDirty || !isValid || isSubmitting} onClick={() => console.log(watch(["family", "surName", "famous"]))}>Submit</button>
                {/* this way is safer which within submitting this button is disabled */}
                <button type="button" onClick={() => isSubmitSuccessful && reset()} disabled={isSubmitting}>Reset</button>
                {/* React-Hook-Form provided trigger("fieldName?: string") method to trigger validation of form manually */}
                <button type="button" onClick={() => trigger()}>Trigger Validation Manually For Whole Form</button>
                <button type="button" onClick={() => trigger("email.peremail")}>Trigger Validation Manually For Specific Field Input</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}