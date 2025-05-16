import { useRef, type MouseEvent, type RefObject } from "react";
import IslandInfo from "./Info/Info";
import { IslandInstance, islandGUIState } from "./IslandStore";
import "./Stage.scss"
import UserBase from "./User/UserBase";





export function CenterStage(){
    const currentIsland = islandGUIState((state) => state.islandToDisplay)
    const centerStage: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

    if (currentIsland == IslandInstance.None){
        return null
    }


    function focusListener(e: MouseEvent){
        if (e.target != null && e.target instanceof Node){
            let inCenterStage = centerStage.current!.contains(e.target)
            if (!inCenterStage){
                islandGUIState.getState().updateIsland(IslandInstance.None)
            }
        }
    }

    return <>
        <section onClick={(e) => {focusListener(e)}} className="center-background">
            <div ref={centerStage} id="center-stage">
                <IslandInfo></IslandInfo>
                <UserBase></UserBase>
            </div>
        </section>
    </>
}

