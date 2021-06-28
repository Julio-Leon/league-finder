import { useContext } from "react"
import { RedirectContext } from "../../App"
import {Redirect} from 'react-router-dom'
import { redirect } from "statuses"

export default function Participant({participant}) {

    const imgPath = `./assets/champion/${participant.champion}.png`
    
    const redirectContext = useContext(RedirectContext)

    const goToParticipant = () => {
        redirectContext.setSearchInput('/' + participant.summoner)
        redirectContext.setRedirect(true)
    }

    if (redirectContext.redirect) return <Redirect to={redirectContext.searchInput} />

    return (
        <div className='participant flex-container' onClick={goToParticipant}>
            <div className="participant-champ">
                <img src={imgPath} width='20px' alt="" />
            </div>
            <div className="participant-name">
                {participant.summoner}
            </div>
        </div>
    )
}