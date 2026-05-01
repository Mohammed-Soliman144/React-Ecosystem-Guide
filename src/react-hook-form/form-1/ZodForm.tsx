import * as z from "zod"

const organizationSchema = z.object({
    orgName: z.string().min(2, "organization name must contains 2 characters at least").max(30, "organization name must  donot exceed 30 characters"),
    orgTax: z.string().refine((val)=> {
        return /^[A-Za-z]{2}[0-9]{6}$/.test(val)
    }, "Tax ID must starts with 2 letters and 6 digits"),
    orgHead: z.object({
        location: z.object({
            city: z.string().trim().min(2, "city name must contains 2 characters at least").max(30, "city name must donot exceed 30 characters"),
            country: z.string().trim().min(2, "country name must contains 2 characters at least").max(30, "country name must donot exceed 30 characters"),
            coordinates: z.tuple([z.coerce.number(), z.coerce.number()]),
        }),
        contact: z.object({
            email: z.email().trim().refine((val) => !val.endsWith("@info.com"), "email must donot end with @info.com"),
            phone: z.string().refine(val => /^\+[0-9]{2}[0-9]{11}$/.test(val), "phone number must starts with country code as +20 then followed by 11 digits")
        })
    }),
    orgBranches: z.array(z.object({
        branchName: z.string().min(2,"branch name must contains 2 characters at least").max(30, "branch name must donot exceed 30 characters"),
        isOpen: z.coerce.boolean().default(false),
        manager: z.object({
            firstName: z.string().trim(),
            lastName: z.string().trim()
        }).refine((val) => val.firstName.length >= 2 && val.firstName.length <= 30 || val.lastName.length >= 2 && val.lastName.length <= 30, "firstName and lastName must be in range between 2 to 30 characters")
    })).min(1,"at least one branch"),
    orgUsers: z.object({
        username: z.string().trim().regex(/[A-Za-z0-9]+/,"username can contain upper, lower characters and digits"),
        Password: z.string().trim().regex(/[A-Z]{1,}/, "password must contains one upper letters or more").regex(/[a-z]{1,}/, "password must contains one lower letters or more").regex(/[~!@#$%^&*()_=+{}]{1,}/, "password must contains one special characters or more as ~!@#$%^&*()_=+{}"),
        confirm: z.string().trim(),
    }),
    orgPlan: z.enum(["Basic", "Premium", "Enterprise"]).default("Basic"),
    orgEmployees: z.coerce.number().positive().int()
}).superRefine((data, ctx) => {
    if(data.orgUsers.Password !== data.orgUsers.confirm) {
        ctx.addIssue({
            // custom issue not invalid_type
            code: "custom",
            message: "password and confirm must be match",
            path: ["orgUsers", "confirm"],
        })
    }
    
    // best practice use forEach which is void not map inside superRefine
    data.orgBranches.forEach((branch, index) => {
        if(branch.branchName === data.orgName) {
            ctx.addIssue({
                code: "custom",
                message: "must branch name does not equal organization name",
                path: ["orgBranches",index, "branchName"]
            })
        }
    })

    // note zod deals with validation and sanitizement of data from user and data inside your code which means when use plan: z.enum(["Basic", "premium"]).default("Basic") => this deals for your code but still user can choose any one and left input empty "=== undefined"
    // if user left plan empty is undefined => and Nulishcoelsing operator check if null or undefined (left operand) return the value on the right (and vise verce) 
    const plan = data.orgPlan ?? "Basic"; 
    switch(plan) {
        case "Basic":
            if(!(data.orgBranches.length >= 1 && data.orgBranches.length <= 2)) {
                ctx.addIssue({
                    code: "custom",
                    message: "branches must be at least one branch and two at most",
                    path: ["orgBranches"]
                }) 
            }
    }

    // all data return form HTMLFormElement always as string data even the input type="number" return the value as string so no need to use z.coerce.string() its already string
    // note path inside error.issues represent location inside your schema must has the same so when appear the error
    data.orgHead.location.coordinates.forEach((coord, index) => {
        if(!(parseFloat(Number(coord).toFixed(4)) >= -90.0000 && parseFloat(Number(coord).toFixed(4)) <= 90.0000 || parseFloat(Number(coord).toFixed(4)) >= -180.0000 && parseFloat(Number(coord).toFixed(4)) <= 180.0000)) {
                ctx.addIssue({
                code: "custom",
                message: "latitude and longtitude must be in range +/- 90.000",
                path: ["orgHead", "location", "coordinates", index]
            })
        }
    })
})


type organType = z.infer<typeof organizationSchema>


const result = organizationSchema.safeParse({
    orgName:  "Google"
})


if(!result.success) {
    const flatErrors = result.error.issues.reduce((acc, err) => {
        const path = err.path.join(".")
        if(acc[path] === undefined)
            acc[path] = []
        acc[path].push(err.message)
        return acc // return accumulate as obeject {err[object.nestedObject.key]: "the whole message as flat string"}
    }, {} as Record<string, string[]>)

    console.log(flatErrors)
}