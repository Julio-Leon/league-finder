export default function Participant({participant}) {

    const imgPath = `./assets/champion/${participant.champion}.png`

    return (
        <div className='participant flex-container'>
            <div className="participant-champ">
                <img src={imgPath} width='20px' alt="" />
            </div>
            <div className="participant-name">
                {participant.summoner}
            </div>
        </div>
    )
}