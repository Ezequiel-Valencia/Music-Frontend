import { type User } from "../../../../types/User"
import { apiServer } from "../../../../utils/config"
import { readStreamBody } from "../../../../utils/tools"


export class GetUserObject{
    public static registerEndpoint = "/register"
    public static loginEndpoint = "/login"

    static async signInRequest(formData: FormData, apiEndpoint: string): Promise<User>{
        let apiURL = apiServer + apiEndpoint
        const response = await fetch(apiURL, {
            method: "POST",
            body: formData,
            credentials: "include"
        })
        if (!response.ok){
            throw new Error(await readStreamBody(response.body as ReadableStream))
        }
        let user: User = await response.json()
        return user
    }
    
    static async handleRequest(formData: FormData,
        setValidationErrors: (ar0: any) => void, refetch: () => any, 
        setHTTPError: (arg0: any) => void, setUser: (arg0: any) => void, 
        validator: any){
        
        const validation = validator.safeParse(Object.fromEntries(formData))
        if (validation.success){
            setValidationErrors([])
            const result = await refetch()
            if (result.error != null){
                setHTTPError(result.error.message);
            } else if (result.data != undefined){
                setUser(result.data)
                window.location.replace("/")
            }
        } else{
            setHTTPError([])
            setValidationErrors(validation.error.errors)
        }
    }
}



