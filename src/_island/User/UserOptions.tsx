import { showNotes, userState } from "../../../utils/UserStore"
import { apiServer } from "../../../utils/config"
import "./UserBase.scss"
import UserBaseError from "./UserBaseError"


function logout(){

}


function UserOptions(){
    const userCache = userState((state) => state.user)
    const updateShowNotes = showNotes((state) => state.updateShowNotes)
    const shouldShowNotes = showNotes((state) => state.showNotes)

    if (userCache === undefined){
        return null
    }
    let elevatedUser = userCache.Role == "Unlimited" || userCache.Role == "TrustedCurator" 
    || userCache.Role == "Curator" || userCache.Role == "OneSubmission"
    let httpError = ""
    return <>
        <section className="user-base-section">
            <div>
                <h1 style={{fontSize: "x-large"}}>Hello {userCache.Username}</h1>
                <UserBaseError err={httpError} ></UserBaseError>
                <div style={{display:"flex", width:"100%"}}>
                    <input checked={shouldShowNotes} onChange={() => {updateShowNotes(!shouldShowNotes)}} 
                    id="show-curator-notes" style={{transform: "scale(1.5)"}} type="checkbox"></input>
                    <label htmlFor="show-curator-notes" style={{whiteSpace:"nowrap", paddingLeft: "4%"}}>Show curator reason for song selection?</label>
                </div>
                {elevatedUser ? <>
                    <button style={{fontSize: "medium", textDecorationColor: "black", textDecorationLine: "underline", paddingTop: "5%"}}
                    onClick={() => {window.open(apiServer.split("/api")[0] + "/curatorPage")}}>
                        Curator Page
                    </button>
                    <br></br>
                </>
                :
                null
            }

                <button onClick={logout} style={{marginTop: "5%", paddingLeft:"10%", paddingRight:"10%"}} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">Logout</button>
            </div>
        </section>
    </>
}


export default UserOptions
