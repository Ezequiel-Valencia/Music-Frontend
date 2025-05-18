import { useSuspenseQuery } from "@tanstack/react-query";
import { todaysSelectionStore, type TodaysSelection } from "../../utils/MusicStore";
import { BackendRequestBuilder } from "../../utils/tools";
import DefaultSongs from "../assets/default_songs.json";
import CuratorDescription from "./CuratorDescription";
import MusicCarousel from "./MusicCarousel";
import VoteSection from "./vote/VoteSection";


async function getTodaysMusic(setTodaysSelection: any){
    let todaysSelection: TodaysSelection = {CuratorDescription: "", CuratorName: "", MusicEntries: []}
    let response = await new BackendRequestBuilder().setEndpoint("/todaysMusic").sendUnAuthenticatedRequest()
    if (response.ok){
        todaysSelection = await response.json()
        todaysSelection!.MusicEntries = todaysSelection!.MusicEntries.sort((song1, song2) => {return song1.SongOrder - song2.SongOrder})
        setTodaysSelection(todaysSelection)
        return todaysSelection
    } else{
        todaysSelection = defaultSongs()
        setTodaysSelection(todaysSelection)
        return todaysSelection
    }
}

export function defaultSongs(){
    let todaysSelection: TodaysSelection = {CuratorDescription: "", CuratorName: "", MusicEntries: []}
    todaysSelection = DefaultSongs
    // descriptionTitle = "There seems to be a problem with the server:"
    todaysSelection?.MusicEntries.sort((song1, song2) => {return song1.SongOrder - song2.SongOrder})
    return todaysSelection
}


function MusicBody(){
    const setTodaysSelection = todaysSelectionStore((state) => state.setSelection)
    const { } = useSuspenseQuery({
        queryKey: ["todaysSelection"],
        queryFn: () => {return getTodaysMusic(setTodaysSelection)},
        retry: 2
    })

    return <>
        <CuratorDescription errorOcurred={false}></CuratorDescription>
        <MusicCarousel></MusicCarousel>
        <VoteSection></VoteSection>
    </>
}

export default MusicBody
