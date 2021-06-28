import Player from "../Player/Player"

export default function CompleteMatchInfo({players}) {
    return (
        <div className='complete-match-info flex-container'>
            {
                players.map((player, i) => {
                    return <Player key={i} player={player} /> 
                })
            }
        </div>
    )
}