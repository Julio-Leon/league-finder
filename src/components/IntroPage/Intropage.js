import { useContext, } from "react"
import { RedirectContext } from "../../App"

export default function IntroPage() {

    const darkModeData = useContext(RedirectContext)

    let fontColor = ''
    if (darkModeData.darkModeOn) {
        fontColor = 'white'
    } else {
        fontColor = 'black'
    }

    return (
        <div>
            <div className='no-player-search' style={{color: fontColor}}>
                No player being searched!
            </div>
            <div className='insert-name'>
                Insert name above to get games
            </div>
        </div>
    )
}