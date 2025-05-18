import { useRef, type JSX } from "react";
import { todaysSelectionStore } from "../../utils/MusicStore";
import Arrow from "../assets/right-arrow.svg";
import styles from "./Music.module.scss";



function MusicCarousel(){
    const carouselPosition = todaysSelectionStore((state) => state.carouselPosition)
    const updateCarousel = todaysSelectionStore((state) => state.setCarouselPosition)
    const todaysSelection = todaysSelectionStore((state) => state.todaysSelection)
    
    const carouselSection = useRef<HTMLDivElement | null>(null)
    carouselSection.current?.style.setProperty("--position", carouselPosition + "")
    
    const leftCarousel = () => {let i = carouselPosition - 1; if (i > -1){updateCarousel(i)}}
    const rightCarousel = () => {let i = carouselPosition + 1; if (i < todaysSelection!.MusicEntries.length){updateCarousel(i)}}

    // document.addEventListener("keydown", (ev) =>{ 
    //     if (ev.key == "ArrowRight"){
    //         rightCarousel()
    //     } else if(ev.key == "ArrowLeft"){
    //         leftCarousel()
    //     }
    // })

    const musicEntriesElements: JSX.Element[] = []

    const musicEntryStyle = (i: number) => ({
        "--offset": i,
        opacity: Math.abs(carouselPosition - i) > 1 ? 0 : 1
    });
    
    todaysSelection?.MusicEntries.map((entry, i) => {
        musicEntriesElements.push(
        <div className={styles.carouselItem}
        key={i}
        style={musicEntryStyle(i)} role="gridcell" tabIndex={i} id={"carousel-item-" + i} onClick={() => {updateCarousel(i)}}>
            <iframe className={styles.iFrame} style={{pointerEvents: i == carouselPosition ? "all" : "none"}} src={"https://www.youtube.com/embed/" + entry.PathResource} 
            title={entry.Title}></iframe>
            <h2>{entry.Title}</h2>
                by
            <p>{entry.Artist}</p>
        </div>)
    })

    return <>
        <section className={styles.musicBodySection}>
            <main className={styles.mainStyle}>
                <button className={styles.sideButton} onClick={() => {leftCarousel()}}>
                    <img className={styles.leftButton} src={Arrow} alt="left-arrow"></img>
                </button>
                
                <div>
                    <div ref={carouselSection} className={styles.carousel}>
                        {musicEntriesElements}
                    </div>
                    <hr style={{height: ".2em", backgroundColor:"rgba(125, 125, 125, 0.42)"}}/>
                </div>
            
                <button className={styles.sideButton} onClick={() => {rightCarousel()}}>
                    <img className={styles.rightButton} src={Arrow} alt="right-arrow"></img>
                </button>
                
            </main>
        </section>
    </>
}


export default MusicCarousel

