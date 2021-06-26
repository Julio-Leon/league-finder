import Items from "../Items/Items"
import PlayerStats from "../PlayerStats/PlayerStats"
import InGameStats from "../InGameStats/InGameStats"
import Participants from "../Participants/Participants"

export default function ({puuid, match}) {

    let win = 'Searching...'

    const items = []

    let champion = ''

    const kdaRatio = []

    const inGameStats = {}

    const participants = []

    match.info.participants.forEach((participant) => {
        if (participant.puuid === puuid) {
            participant.win ? win = "Victory" : win = "Defeat"
            for (let i = 0; i <= 6; i++) {
                items.push(participant[`item${i}`])
            }
            champion = participant.championName
            // KDA
            kdaRatio.push(participant.kills)
            kdaRatio.push(participant.deaths)
            kdaRatio.push(participant.assists)
            // Level, CS, gold
            inGameStats.level = participant.champLevel
            inGameStats.creepScore = participant.totalMinionsKilled
            inGameStats.goldEarned = participant.goldEarned
        }
        // particants
        participants.push(
            {
                champion: participant.championName,
                summoner: participant.summonerName
            }
        )
    })

    // Formatting Items Order
    const temp = items[6]
    items[6] = items[3]
    items[3] = temp

    console.log(match)

    return (
        <div className="match flex-container">
            <div className="player-stats flex-container">
                <PlayerStats champion={champion} kdaRatio={kdaRatio} />
            </div>
            <div className='items'>
                <Items items={items} />
            </div>
            <div className="in-game-stats">
                <InGameStats level={inGameStats.level} creepScore={inGameStats.creepScore} goldEarned={inGameStats.goldEarned} />
            </div>
            {/* <div className="participants flex-container">
                <Participants participants={participants} />
            </div> */}
            <div className="match-result">
                {win.toString()}
            </div>
        </div>
    )
}