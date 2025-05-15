import { create } from "zustand"

export enum IslandInstance {
    Calendar,
    Info,
    User,
    None
}

interface IslandGUIState{
    islandToDisplay: IslandInstance
    updateIsland: (island: IslandInstance) => void
}

export const islandGUIState = create<IslandGUIState>()(
    function initializer(set){
        return {
            islandToDisplay: IslandInstance.None,
            updateIsland: (island: IslandInstance) => {
                set({islandToDisplay: island})
            }
        }
    }
)


