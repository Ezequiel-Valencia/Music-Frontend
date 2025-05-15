import { IslandInstance, islandGUIState } from "../IslandStore";


function IslandInfo(){
    const currentIsland = islandGUIState((state) => state.islandToDisplay)
    if (currentIsland != IslandInstance.Info){
        return null
    }
    return <>
        <section>
            <h1>About This Site</h1>
            <p>
                This website was developed by 
                 <a href="ezequielvalencia.com"> Ezequiel Valencia</a> to 
                help promote music other people found a deep connection with,
                whether due to it's message or simply its rhythm.
            </p>
        </section>
    </>
}

export default IslandInfo
