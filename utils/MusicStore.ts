import { create } from "zustand";
import { z } from "zod";

const musicEntry = z.object({
    Title: z.string(),
    Artist: z.string(),
    PathResource: z.string(),
    SongOrder: z.number()
})

const todaysSelection = z.object({
    CuratorName: z.string(),
    CuratorDescription: z.string(),
    MusicEntries: z.array(musicEntry)
})

const pastVotes = z.object({
    Title: z.string(),
    Artist: z.string(),
    SongURL: z.string(),
    Date: z.string()
})


export type MusicEntry = z.infer<typeof musicEntry>
export type TodaysSelection = z.infer<typeof todaysSelection>
export type PastVote = z.infer<typeof pastVotes>

type TodaysSelectionCache = {
    todaysSelection: TodaysSelection | null
    carouselPosition: number
    setSelection: (selection: TodaysSelection) => void
    setCarouselPosition: (i: number) => void 
}


export const todaysSelectionStore = create<TodaysSelectionCache>()(
    function initializer(set, get){
        return {
            todaysSelection: null,
            carouselPosition: 1,
            setSelection: (selection: TodaysSelection) => {
                set({carouselPosition: get().carouselPosition, todaysSelection: selection})
            },
            setCarouselPosition: (i) => {
                set({carouselPosition: i, todaysSelection: get().todaysSelection})
            }
        }
    }
)






