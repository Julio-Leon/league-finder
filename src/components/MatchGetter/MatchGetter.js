import { useState, useEffect, createContext, useContext } from 'react';
import {Redirect} from 'react-router-dom'
import { RedirectContext } from '../../App';

import Matches from '../Matches/Matches';
import DataHeader from '../DataHeader/DataHeader';

const MY_API_KEY = "RGAPI-79849f97-8af7-45fd-8338-b985bd0c297c"
const API_KEY = "api_key=" + MY_API_KEY

const BY_PLAYER_NAME_ENDPOINT = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"

const GET_MATCHES_BY_PUUID_ENDPOINT_ONE = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"

const GET_MATCH_DATA_WITH_ID_ENDPOINT = "https://americas.api.riotgames.com/lol/match/v5/matches/"

const GET_SOLO_QUEUE_DATA_ENDPOINT = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/"

export const DataContext = createContext()

function MatchGetter(props) {

    const [matches, setMatches] = useState("")
    const [puuid, setPuuid] = useState("")
    const [id, setId] = useState("")
    const [soloQ, setSoloQ] = useState("")

    const [playerIcon, setPlayerIcon] = useState('')
  
    const player = {
        matches,
        searchPlayer: props.match.params.name,
        puuid,
        id,
    }

    const redirectContext = useContext(RedirectContext)

    const getPlayerData = async () => {
        setMatches('')
        const playerName = player.searchPlayer + "?"
        if (playerName === "?") {
          return
        }
        const playerMatchesData = []
        try {
          const nameResponse = await fetch(BY_PLAYER_NAME_ENDPOINT + playerName + API_KEY)
          if (nameResponse.status === 404) redirectContext.setInvalidRedirect(true)
          const nameData = await nameResponse.json()
          
          setId(nameData.id)
          setPuuid(nameData.puuid)
    
          // GETTING ACCOUNT INFO
          const playerInfoResponse = await fetch(GET_SOLO_QUEUE_DATA_ENDPOINT + nameData.id + '?' + API_KEY)
          if (playerInfoResponse.status === 404) redirectContext.setInvalidRedirect(true)
          const playerInfo = await playerInfoResponse.json()
    
            try {
                setSoloQ({
                rank: playerInfo[0].rank,
                tier: playerInfo[0].tier,
                leaguePoints: playerInfo[0].leaguePoints
                })
            } catch (err) {
                redirectContext.setInvalidRedirect(true)
            }
          
          // GETTING MATCHES
          let startCount = 0
          let endCount = 10
          while (playerMatchesData.length < 10) {
            const matchesIDsResponse = await fetch(GET_MATCHES_BY_PUUID_ENDPOINT_ONE + nameData.puuid + `/ids?start=${startCount.toString()}&count=${endCount.toString()}&` + API_KEY)
    
            // Gets array of matchesIDs(strings)
            const matchesIDs = await matchesIDsResponse.json()
    
            for (const matchID of matchesIDs) {
              const matchResponse = await fetch(GET_MATCH_DATA_WITH_ID_ENDPOINT + matchID + "?" + API_KEY)
              if (matchResponse.status === 200) {
                const matchData = await matchResponse.json()
                playerMatchesData.push(matchData)
              }
            }
            startCount += 10
            endCount += 10
          }
          setMatches(playerMatchesData)
        } catch (error) {
          console.error(error)
        }
      }
    
      useEffect(() => {
        getPlayerData()
      }, [player.searchPlayer])
    
      if (redirectContext.invalidRedirect) return <Redirect to='invalid-name' />

    return (
        <div className="data-container flex-container">
          { matches ? (
              <DataHeader playerName={player.searchPlayer} playerRank={soloQ.rank} playerTier={soloQ.tier} playerLeaguePoints={soloQ.leaguePoints} playerIcon={playerIcon} />
            ) : (
              <p></p>
            )
          }
          <div>
            { matches ? (
                <DataContext.Provider value={{setPlayerIcon}}>
                  <Matches puuid={player.puuid} matches={player.matches} />
                </DataContext.Provider>
              ) : (
                <div className="searching">
                    Searching...
                </div>
              )
            }
          </div>
      </div>
    )
}

export default MatchGetter;