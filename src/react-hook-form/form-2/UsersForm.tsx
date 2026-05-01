import {useForm} from "react-hook-form"
// import {useId} from react

interface Iform {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: number,
      lng: number
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}
export const UsersForm = () => {
    const {register, formState, handleSubmit, control} = useForm<Iform>({
        defaultValues: async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
                method: "GET",
                headers: {"CONTENT-TYPE": "application/json"}
            });
            const data = await res.json()
            return data
        }
    })

    const handleSubmission = (formData: Iform) => {
        console.log(formData)
    }
    return <form action={""}  method="GET" onSubmit={handleSubmit(handleSubmission)}>
        <div className="form-controls">
            <label>Username: </label>
            <input type="text" id="email" {...register("email")} />
        </div>
    </form>
}