import Items from "../Items/Items"
import PlayerStats from "../PlayerStats/PlayerStats"
import InGameStats from "../InGameStats/InGameStats"
import Participants from "../Participants/Participants"
import SummonerSpells from "../SummonerSpells/SummonerSpells"
import { DataContext } from "../MatchGetter/MatchGetter"
import { useState, useContext } from "react"
import CompleteMatchInfo from "../CompleteMatchInfo/CompleteMatchInfo"

export default function ({puuid, match}) {

    const [showInfo, setShowInfo] = useState(false)

    const toggleShowInfo = () => {
        showInfo ? setShowInfo(false) : setShowInfo(true)
    }

    let win = 'Searching...'

    const data = useContext(DataContext)

    const items = []

    const summonerSpells = []

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
            // Player Icon
            data.setPlayerIcon(participant.profileIcon)
            // Summoner Spells
            summonerSpells.push(participant.summoner1Id)
            summonerSpells.push(participant.summoner2Id)
        }
        // participants
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

    let styler = ''

    if (win === 'Victory') styler = 'green'; else styler = 'red'

    let infoStyler = 'none'
    
    if (showInfo) infoStyler = 'flex'
    // MATCH INFO
    const players = []
    match.info.participants.forEach((participant) => {
        const participantData = {}
        participantData.summoner = participant.summonerName
        participantData.champion = participant.championName
        participantData.items = []
        for (let i = 0; i <= 6; i++) {
            participantData.items.push(participant[`item${i}`])
        }
        participantData.playerKDA = []
        participantData.playerKDA.push(participant.kills)
        participantData.playerKDA.push(participant.deaths)
        participantData.playerKDA.push(participant.assists)
        participantData.level = participant.champLevel
        participantData.creepScore = participant.totalMinionsKilled
        players.push(participantData)
    })

    return (
        <div className="match-container">
            <div className="match flex-container">
                <div className="player-stats flex-container">
                    <PlayerStats champion={champion} kdaRatio={kdaRatio} />
                </div>
                <div className="summoner-spells">
                    <SummonerSpells summonerSpells={summonerSpells} />
                </div>
                <div className='items'>
                    <Items items={items} />
                </div>
                <div className="in-game-stats">
                    <InGameStats level={inGameStats.level} creepScore={inGameStats.creepScore} goldEarned={inGameStats.goldEarned} />
                </div>
                <div className="participants flex-container">
                    <Participants participants={participants} />
                </div>
                <div className="match-result" style={{color: styler}}>
                    {win.toString()}
                </div>
                <div className='info-button' onClick={toggleShowInfo}>
                    ...
                </div>
            </div>
            <div className="match-info" style={{display: infoStyler}}>
                <CompleteMatchInfo players={players} />
            </div>
        </div>
    )
}