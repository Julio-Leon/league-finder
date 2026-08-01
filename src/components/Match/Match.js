import Items from "../Items/Items"
import PlayerStats from "../PlayerStats/PlayerStats"
import InGameStats from "../InGameStats/InGameStats"
import Participants from "../Participants/Participants"
import SummonerSpells from "../SummonerSpells/SummonerSpells"
import { DataContext } from "../MatchGetter/MatchGetter"
import { useState, useContext } from "react"
import CompleteMatchInfo from "../CompleteMatchInfo/CompleteMatchInfo"

export default function Match({puuid, match}) {

    const [showInfo, setShowInfo] = useState(false)

    const toggleShowInfo = () => {
        showInfo ? setShowInfo(false) : setShowInfo(true)
    }

    const [playerMatches, setPlayerMatches] = useState({
        win: 'Searching...',
        items: [],
        champion: '',
        kdaRatio: [],
        inGameStats: {},
        summonerSpells: [],
        participants: []
    })

    const data = useContext(DataContext)

    match.info.participants.forEach((participant) => {
        if (participant.puuid === puuid) {
            playerMatches.win = participant.win ? "Victory" : "Defeat"
            for (let i = 0; i <= 6; i++) {
                playerMatches.items.push(participant[`item${i}`])
            }
            playerMatches.champion = participant.championName
            // KDA
            playerMatches.kdaRatio.push(participant.kills)
            playerMatches.kdaRatio.push(participant.deaths)
            playerMatches.kdaRatio.push(participant.assists)
            // Level, CS, gold
            playerMatches.inGameStats.level = participant.champLevel
            playerMatches.inGameStats.creepScore = participant.totalMinionsKilled
            playerMatches.inGameStats.goldEarned = participant.goldEarned
            // Player Icon
            data.setPlayerIcon(participant.profileIcon)
            // Summoner Spells
            playerMatches.summonerSpells.push(participant.summoner1Id)
            playerMatches.summonerSpells.push(participant.summoner2Id)
        }
        // participants
        playerMatches.participants.push(
            {
                champion: participant.championName,
                summoner: participant.summonerName
            }
        )
    })

    // Formatting Items Order
    const temp = playerMatches.items[6]
    playerMatches.items[6] = playerMatches.items[3]
    playerMatches.items[3] = temp

    let styler = ''

    if (playerMatches.win === 'Victory') styler = 'darkgreen'; else styler = 'red'

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
        participantData.summonerSpells = []
        participantData.summonerSpells.push(participant.summoner1Id)
        participantData.summonerSpells.push(participant.summoner2Id)
        players.push(participantData)
    })

    console.log(players)

    return (
        <div className="match-container">
            <div className="match flex-container">
                <div className="player-stats flex-container">
                    <PlayerStats champion={playerMatches.champion} kdaRatio={playerMatches.kdaRatio} />
                </div>
                <div className="summoner-spells">
                    <SummonerSpells summonerSpells={playerMatches.summonerSpells} />
                </div>
                <div className='items'>
                    <Items items={playerMatches.items} />
                </div>
                <div className="in-game-stats">
                    <InGameStats level={playerMatches.inGameStats.level} creepScore={playerMatches.inGameStats.creepScore} goldEarned={playerMatches.inGameStats.goldEarned} />
                </div>
                <div className="participants flex-container">
                    <Participants participants={playerMatches.participants} />
                </div>
                <div className="match-result" style={{color: styler}}>
                    {playerMatches.win.toString()}
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