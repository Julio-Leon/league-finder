import { useContext, } from "react"
import { RedirectContext } from "../../App"

export default function DarkModeButton() {

    const darkModeData = useContext(RedirectContext)

    let fontColor = ''
    if (darkModeData.darkModeOn) {
        fontColor = 'white'
    } else {
        fontColor = 'black'
    }

    return (
        <div className="button-holder flex-container">
            <div className='dark-mode-text' style={{color: fontColor}}>
                Dark Mode:
            </div>
            <div className="toggle-container" onClick={() => darkModeData.setDarkModeOn(!darkModeData.darkModeOn)}>
                <div className={`dialog-button ${darkModeData.darkModeOn ? "" : "disabled"}`}>
                    {darkModeData.darkModeOn ? "YES" : "NO"}
                </div>
            </div>
        </div>
    )
}