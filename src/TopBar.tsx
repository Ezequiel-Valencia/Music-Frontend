import "./App.scss"
import Calendar from "./assets/Calendar.svg"
import UserCircle from "./assets/user-circle.svg"

import { userStore } from "../utils/UserStore"
import { IslandInstance, islandGUIState } from "./_island/IslandStore"
import { CenterStage } from "./_island/CenterStage"



function TopBar(){
    const user = userStore((state) => state.user)
    const updateIslandState = islandGUIState((state) => state.updateIsland)
    return <>
        <nav id="top-bar">
            <button onClick={() => {updateIslandState(IslandInstance.Calendar)}}>
                <figure style={{paddingLeft: "2vw"}} className="figures">
                    <img className="icons" src={Calendar} alt="Calendar"></img>
                    <figcaption >Past Votes</figcaption>
                </figure>
            </button>

            <button onClick={() => {updateIslandState(IslandInstance.Info)}} className="center-text">
                <div>
                    <h1 id="title-text">Three-Mix</h1>
                    <em>
                        <p>Remixing the way music is found.</p>
                    </em>
                </div>
            </button>
            <button onClick={() => {updateIslandState(IslandInstance.User)}}>
                <figure style={{paddingRight: "2vw"}} className="figures">
                    <img className="icons" src={UserCircle} alt="User"></img>
                    <figcaption>{user == null ? "Login" : user.Username}</figcaption>
                </figure>
            </button>

            <CenterStage></CenterStage>
        </nav>
    </>
}

export default TopBar
