import { create } from "zustand";
import type { User } from "../types/User";
import { localStorageOrDefault } from "./tools";


interface UserPreferencesState{
    showNotes: boolean,
    updateShowNotes: (bool: boolean) => void
}


export const showNotesStore = create<UserPreferencesState>()(
    function initializer(set, get, store){
        let key = "showCuratorNotes";
        return {
            showNotes: localStorageOrDefault<boolean>(key, true)!,
            updateShowNotes: (bool) => set((state) => {
                localStorage.setItem(key, JSON.stringify(bool)) // sets local storage
                return { showNotes: bool }
            } )
        }
    }
);

/**
 * Uses the local storage date of last voted as a cache reference
 * for whether voting is allowed. Verfication is still done on the server
 * no matter the state of local storage.
 */
export type VoteDecision = {
    dateUTC: string
    number: number
}

interface VoteState{
    lastVote: VoteDecision
    updateLastVote: (vote: VoteDecision) => void
    didTheyVoteToday: () => boolean
}

export const voteStore = create<VoteState>()(
    function initializer(set, get){
        let minute = 60 * 1000
        let day = 24 * 60 * minute
        let yesterday = new Date(new Date().getTime() - day)
        let defaultLastVote = {
            dateUTC: yesterday.toUTCString(),
            number: 0
        }
        let key = "lastVote"
        return {
            lastVote: localStorageOrDefault<VoteDecision>(key, defaultLastVote)!,
            updateLastVote: (vote) => set(() => {
                localStorage.setItem(key, JSON.stringify(vote));
                set({lastVote: vote})
                return {lastVote: vote}
            }),
            didTheyVoteToday: () => {return new Date(get().lastVote.dateUTC).getDate() == new Date().getDate()}
        }
    }
)


export type UserCache = {
    user: User | undefined,
    setUser: (user: User) => void,
    delete: () => void
}



// function readUserCache(key: string): User | null{
//     if (isLocalStorageItemNotPresent(key)) {
//         return null
//     } else if (Cookies.get("csrf_token") != undefined){
//         return JSON.parse(localStorage.getItem(key) as string) 
//     } else{
//         localStorage.removeItem(key)
//         return null
//     }
// }


export const userState = create<UserCache>()(
    function initializer(set){
        let key = "user_cache";
        return {
            user: localStorageOrDefault<User>(key, undefined),
            setUser: (userToBeSet: User) => {
                set({user: userToBeSet})
                localStorage.setItem(key, JSON.stringify(userToBeSet))
            },
            delete: () => {
                set({user: undefined})
                localStorage.removeItem(key)
            }
        }
    }
)

/**
 * Attempt to get the user cache. But if the csrf or session tokens are not present,
 * delete the user cache and return null.
 * @returns UserCache
 */

