import { useQuery } from "@tanstack/react-query"
import { todaysSelectionStore } from "../../../utils/MusicStore"
import { userState, voteStore } from "../../../utils/UserStore"
import { BackendRequestBuilder, readStreamBody } from "../../../utils/tools"
import VoteRadioButtons from "./VoteRadioButtons"
import styles from "./VoteSection.module.scss"




function VoteSection(){
    const lastVote = voteStore((state) => state.lastVote)
    const didTheyVoteToday = voteStore((state) => state.didTheyVoteToday)
    const updateVoteState = voteStore((state) => state.updateLastVote)
    const carouselPosition = todaysSelectionStore((state) => state.carouselPosition)
    const todaysSelection = todaysSelectionStore((state) => state.todaysSelection)
    const user = userState((state) => state.user)


    const { refetch } = useQuery({
        queryFn: async () => {
            let jsonVersionOfVote = JSON.stringify({SongOrder: carouselPosition})
            let responsePromise = new BackendRequestBuilder().setEndpoint("/voteMusic")
            .setMethod("POST").isSendingJSON(true)
            .setBody(jsonVersionOfVote).sendAuthenticatedRequest()
            if (typeof responsePromise !== "string"){
                let response = await responsePromise
                if (response.ok){
                    updateVoteState({dateUTC: new Date().toUTCString(), number: carouselPosition})
                    return true
                } else{
                    let body = await readStreamBody(response.body as ReadableStream)
                    window.alert(body)
                    return false
                }            
            } else{
                window.alert(responsePromise)
                return false
            }
        },
        queryKey: ["vote"],
        enabled: false,
        retry: false
    })

    function formSubmission(e: React.FormEvent){
        e.preventDefault()
        refetch()
    }


    if (user === null || user === undefined){
        return <>
            <div className={styles.voteForm}>
                <label style={{fontSize: "xx-large"}} htmlFor="best-song"><u>Which Song is Your Favorite?</u></label>
                <div style={{display: "grid"}}>
                   <VoteRadioButtons></VoteRadioButtons>
                </div>
                <div>
                    <div style={{textAlign: "center"}}>
                        <h2 style={{fontSize: "x-large", margin:"auto"}}>
                            Login to cast a vote.
                        </h2>
                    </div>
                </div>
            </div>
        </>
    }

    

    return <>
        <form onSubmit={formSubmission} className={styles.voteForm}>
            <label style={{fontSize: "xx-large"}} htmlFor="best-song"><u>Which Song is Your Favorite?</u></label>
            <div style={{display: "grid"}}>
                <VoteRadioButtons></VoteRadioButtons>
            </div>

            {didTheyVoteToday() ? <></> :
            
            <button disabled={didTheyVoteToday()} type="submit" 
            style={{textAlign: "center" }}
            className={styles.voteButton}>
                Vote
            </button>
            }
            
        </form>

        {didTheyVoteToday() ? <div style={{position:"relative", textAlign: "center", bottom: "3vh"}}>
            <h2 style={{fontSize: "x-large", margin:"auto"}}>
                You've Voted For: {todaysSelection?.MusicEntries[lastVote.number].Title} by {todaysSelection?.MusicEntries[lastVote.number].Artist}
            </h2>
        </div> : 
            <></>
        }
    </>
}




export default VoteSection

