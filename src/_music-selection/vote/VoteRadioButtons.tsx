import { type JSX } from "react"
import { todaysSelectionStore } from "../../../utils/MusicStore"
import { voteStore } from "../../../utils/UserStore"
import styles from "./RadioButtons.module.scss"

function VoteRadioButtons(){
    const lastVote = voteStore((state) => state.lastVote)
    const didTheyVoteToday = voteStore((state) => state.didTheyVoteToday)
    const updateCarouselPosition = todaysSelectionStore((state) => state.setCarouselPosition)
    const carouselPosition = todaysSelectionStore((state) => state.carouselPosition)
    const todaysSelection = todaysSelectionStore((state) => state.todaysSelection)


    let musicEntryButtons: JSX.Element[] = []
    let showBorder = (i: number) => {return didTheyVoteToday() ? i == lastVote.number : i == carouselPosition}
    let radioButtonStyle = (i: number) => ({
        justifyContent: "left", 
        backgroundColor: didTheyVoteToday() && lastVote.number == i ? "rgba(128, 128, 128, 0.4)": "transparent",
        alignItems:"start", 
        borderColor: showBorder(i) ? "black": ""
    })

    todaysSelection?.MusicEntries.map((entry, i) => {
        musicEntryButtons.push(
            <button key={i} type="button" disabled={didTheyVoteToday()} 
            className={styles.particlesCheckboxContainer} onClick={() => {
                if (!didTheyVoteToday()){
                    updateCarouselPosition(i)}
                }
            } 
                style={radioButtonStyle(i)}>
                <input 
                disabled={didTheyVoteToday()} 
                checked={showBorder(i)} 
                onChange={() => {}}
                className={styles.particlesCheckbox} type="radio" 
                name="music-choice"/>
                <span>{entry.Title} by {entry.Artist}</span>
            </button>
        )
    })

    return <>
        {musicEntryButtons}
    </>
}



export default VoteRadioButtons

