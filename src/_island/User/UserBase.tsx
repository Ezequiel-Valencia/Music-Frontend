import { IslandInstance, islandGUIState } from "../IslandStore";
import UserForm from "./Forms/UserForm";
import UserOptions from "./UserOptions";

function UserBase(){
    const currentIsland = islandGUIState((state) => state.islandToDisplay)
    if (currentIsland != IslandInstance.User){
        return null
    }
    return <>
        <UserForm></UserForm>
        <UserOptions></UserOptions>
    </>
}


export default UserBase
