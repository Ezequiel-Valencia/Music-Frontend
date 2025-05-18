import { create } from "zustand"



export class IslandInstance{
    public static Calendar = 0
    public static Info = 1
    public static User = 2
    public static None = 3
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


