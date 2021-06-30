import { useContext, } from "react"
import { RedirectContext } from "../../App"

export default function InvalidName() {

    const darkModeData = useContext(RedirectContext)

    let fontColor = ''
    if (darkModeData.darkModeOn) {
        fontColor = 'white'
    } else {
        fontColor = 'black'
    }


    return (
        <div className='invalid-name' style={{color: fontColor}}>
            Player was not found!
        </div>
    )
}