
import type { JSX } from "react"
import "./UserBaseErr.scss"

type UserBaseErrProp = {
    err: string
}

export function validationErrorReducer(state: JSX.Element[], errs: Zod.ZodIssue[]): JSX.Element[] {
    state = []
    errs.map((err, i) => {
        state.push(<UserBaseError key={i} err={err.message}></UserBaseError>)
    })
    return state;
}

function UserBaseError({err}: UserBaseErrProp){
    if (err == "" || err == undefined || err == null){
        return null
    }
    return <>
        <div className="err-div">
            <p className="err-p">{err}</p>
        </div>
    </>
}

export default UserBaseError
