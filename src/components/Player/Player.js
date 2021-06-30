import PlayerChampion from './PlayerChampion/PlayerChampion'
import PlayerItems from './PlayerItems/PlayerItems'
import PlayerSummonerSpells from './PlayerSummonerSpells/PlayerSummonerSpells'
import { useContext } from 'react'
import { RedirectContext } from '../../App'

// Fix player info participants

export default function Player({player}) {

    const darkModeData = useContext(RedirectContext)

    let fontColor = ''
    if (darkModeData.darkModeOn) {
        fontColor = 'white'
    } else {
        fontColor = 'black'
    }

    return (
        <div className='player flex-container'>
            <div className='player-info-level flex-container' style={{color: fontColor}}>
                {player.level}
            </div>
            <div className='player-info-champion flex-container'>
                <PlayerChampion champion={player.champion} />
            </div>
            <div className="player-info-spells flex-container">
                <PlayerSummonerSpells summoner1={player.summonerSpells[0]} summoner2={player.summonerSpells[1]} />
            </div>
            <div className="player-info-summoner flex-container" style={{color: fontColor}}>
                {player.summoner}
            </div>
            <div className='player-info-kda flex-container' style={{color: fontColor}}>
                {player.playerKDA[0]}/{player.playerKDA[1]}/{player.playerKDA[2]}
            </div>
            <div className='player-info-cs flex-container' style={{color: fontColor}}>
               {player.creepScore} CS
            </div>
            <PlayerItems items={player.items} />
        </div>
    )
}