import { useState } from "react"
import { todaysSelectionStore } from "../../utils/MusicStore"
import UserPic from "../assets/user-circle.svg"
import styles from "./Music.module.scss"
import { showNotesStore } from "../../utils/UserStore"

type CuratorDescriptionProps = {
    errorOcurred: boolean
}




function CuratorDescription({errorOcurred}: CuratorDescriptionProps){
    const userPreferences = showNotesStore((state) => state.showNotes)
    const [showCuratorReason, updateShowCuratorReason] = useState<boolean>(userPreferences)
    const todaysSelection = todaysSelectionStore((state) => state.todaysSelection)

    let descriptionTitle = ""
    if (errorOcurred){
        descriptionTitle = "There seems to be some server errors:"
    } else{
        descriptionTitle = "Why These Songs Where Chosen By " + todaysSelection?.CuratorName + ":"
    }

    if (showCuratorReason == false){
        return null
    }
    

    return <>
        <section className={styles.curatorDescription}>
        <div style={{display:"flex", margin:"auto", width: "90%", alignItems:"center", paddingTop:"1%", paddingBottom:"1%"}}>
            <figure className={styles.figures} style={{alignItems:"center"}}>
                <img style={{height:"8vh"}} alt="user-profile-pic" src={UserPic}></img>
                <figcaption style={{textAlign: "center"}}>
                    {todaysSelection?.CuratorName}
                </figcaption>
            </figure>
            <div style={{marginRight:"1vw",paddingLeft: "5%"}}>
                <h3 className="text-lg pb-2">
                    <em>
                        <u>{descriptionTitle}</u>
                    </em>
                </h3>
                <p>
                    {todaysSelection?.CuratorDescription}
                </p>
            </div>
        </div>
        <button className="cursor-pointer" onClick={() => {updateShowCuratorReason(false)}} style={{fontSize:"x-large", position:"absolute", top: "10px", right: "10px"}}>
            X
        </button>
    </section>
    </>
}


export default CuratorDescription
