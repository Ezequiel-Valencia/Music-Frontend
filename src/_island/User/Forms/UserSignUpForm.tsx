import { useQuery } from "@tanstack/react-query"
import { useReducer, useRef, useState } from "react"
import { userState } from "../../../../utils/UserStore"
import UserBaseError, { validationErrorReducer } from "../UserBaseError"
import { GetUserObject } from "./Request"
import { registerFormSchema } from "../../../../types/User"



function UserSignUpForm(){
    const [httpError, setHTTPError] = useState("")
    const form = useRef<HTMLFormElement>(null)
    const [validationErrors, setValidationErrors] = useReducer(validationErrorReducer, []);
    const setUser = userState((state) => state.setUser)
    let formData: FormData
    
    const { refetch } = useQuery({
        queryKey: ['user'],
        queryFn: () => GetUserObject.signInRequest(formData, GetUserObject.registerEndpoint),
        enabled: false,
        retry: false,
    })

    async function sendForm(e: React.FormEvent){
        e.preventDefault() // To stop the page from refreshing on submission
        
        formData = new FormData(form.current!)

        GetUserObject.handleRequest(formData, setValidationErrors,
            refetch, setHTTPError, setUser, registerFormSchema)
    }

    return <>
        <form onSubmit={sendForm} ref={form} className="user-form" id="signup-form">
            {validationErrors}
            <UserBaseError err={httpError} ></UserBaseError>
            <div style={{display: "flex"}}>
                <div style={{textAlign:"left", paddingRight:"3%"}} className="login-input">
                    <label className="login-label" htmlFor="username">Username: </label>
                    <label className="login-label" htmlFor="email">Email: </label>
                    <label className="login-label" htmlFor="password">Password: </label>
                </div>
                <div className="login-input">
                    <input className="user-input" id="username" type="text" name="username"></input>
                    <input className="user-input" id="email" type="email" name="email"></input>
                    <input className="user-input" id="password" type="password" name="password"></input>
                </div>
            </div>
            <button className="form-submission-button bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded" type="submit">Sign Up</button>
        </form>
    </>
}

export default UserSignUpForm

