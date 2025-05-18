import { userStore } from "../../../../utils/UserStore";
import UserSignUpForm from "./UserSignUpForm";
import UserLoginForm from "./UserLoginForm";
import "./UserForm.scss"
import { useState } from "react";



function UserForm(){
    const [showLogin, setLogin] = useState(false);
    const userCache = userStore((state) => state.user)
    if (userCache != null && userCache != undefined){
        return null
    }
    return <>
        <div style={{textAlign: "center"}}>
        <h1 style={{fontSize: "x-large"}}>{showLogin ? "Please Login": "Please Sign Up"}</h1>
        
        {showLogin ? <UserLoginForm></UserLoginForm> : <UserSignUpForm></UserSignUpForm>}
        
        <button onClick={() => {setLogin(!showLogin)}} id="sign-up">
            {showLogin ? "Show Sign Up": "Show Login"}
        </button>
    </div>
    </>
}


export default UserForm

