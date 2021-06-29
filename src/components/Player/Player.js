import PlayerChampion from './PlayerChampion/PlayerChampion'
import PlayerItems from './PlayerItems/PlayerItems'

// Dark Mode
// Different Languages
// Fix Bug with Names and CS
// Different Servers
// Add Summoner Spells To Info Players

// Home Page
    // Trailer of game
    // Big Input for Name
    

export default function Player({player}) {

    return (
        <div className='player flex-container'>
            <div className='player-info-level flex-container'>
                {player.level}
            </div>
            <div className='player-info-champion flex-container'>
                <PlayerChampion champion={player.champion} />
            </div>
            <div className="player-info-summoner flex-container">
                {player.summoner}
            </div>
            <div className='player-info-kda flex-container'>
                {player.playerKDA[0]}/{player.playerKDA[1]}/{player.playerKDA[2]}
            </div>
            <div className='player-info-cs flex-container'>
               {player.creepScore} CS
            </div>
            <PlayerItems items={player.items} />
        </div>
    )
}