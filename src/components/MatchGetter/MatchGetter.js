import { useState, useEffect, createContext, useContext } from 'react';
import {Redirect} from 'react-router-dom'
import { RedirectContext } from '../../App';

import Matches from '../Matches/Matches';
import DataHeader from '../DataHeader/DataHeader';

require('dotenv').config();

const MY_API_KEY = process.env.REACT_APP_MY_API_KEY
const API_KEY = "api_key=" + MY_API_KEY

const BY_PLAYER_NAME_ENDPOINT_START = 'https://'

const BY_PLAYER_NAME_ENDPOINT_END = ".api.riotgames.com/lol/summoner/v4/summoners/by-name/"

const GET_MATCHES_BY_PUUID_ENDPOINT_ONE = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"

const GET_MATCH_DATA_WITH_ID_ENDPOINT = "https://americas.api.riotgames.com/lol/match/v5/matches/"

const GET_SOLO_QUEUE_DATA_ENDPOINT_START = 'https://'

const GET_SOLO_QUEUE_DATA_ENDPOINT_END = ".api.riotgames.com/lol/league/v4/entries/by-summoner/"

export const DataContext = createContext()

function MatchGetter(props) {

    const [matches, setMatches] = useState(false)
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

    let searchingColor = ''
    if (redirectContext.darkModeOn) {
      searchingColor = 'white'
    } else {
      searchingColor = 'black'
    }

    const fetchPlayerData = async () => {
      const PLAYER_ENDPOINT = 'http://localhost:4000/'
      try {
        const playerResponse = await fetch(PLAYER_ENDPOINT + redirectContext.server + '/' + player.searchPlayer)
        const playerData = await playerResponse.json()
        console.log(playerData)
        setId(playerData.id)
        setPuuid(playerData.puuid)
        setSoloQ(playerData.soloQ)
        setMatches(playerData.matches)
        console.log(playerData.matches)
      } catch (error) {
        console.error(error)
      }
    }

    const getPlayerData = async () => {
      setMatches('')
      const playerName = player.searchPlayer + "?"
      console.log(playerName)
      if (playerName === "?") {
        return
      }
      const playerMatchesData = []
      try {
          redirectContext.setCorsFailed(false)
          
          const nameResponse = await fetch(BY_PLAYER_NAME_ENDPOINT_START + redirectContext.server + BY_PLAYER_NAME_ENDPOINT_END + playerName + API_KEY)
          
          if (nameResponse.status === 404) {
            redirectContext.setInvalidRedirect(true)
            return
          }
          const nameData = await nameResponse.json()
          
          setId(nameData.id)
          setPuuid(nameData.puuid)
    
          // GETTING ACCOUNT INFO
          const playerInfoResponse = await fetch(GET_SOLO_QUEUE_DATA_ENDPOINT_START + redirectContext.server + GET_SOLO_QUEUE_DATA_ENDPOINT_END + nameData.id + '?' + API_KEY)
          const playerInfo = await playerInfoResponse.json()
    
            try {
                setSoloQ({
                  rank: playerInfo[0].rank,
                  tier: playerInfo[0].tier,
                  leaguePoints: playerInfo[0].leaguePoints
                })
            } catch (err) {
                setSoloQ({
                  rank: '-',
                  leaguePoints: '-'
                })
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
          console.log(playerMatchesData)
        } catch (error) {
          redirectContext.setCorsFailed(true)
        }
      }
    
      useEffect(() => {
        fetchPlayerData()
      }, [player.searchPlayer, redirectContext.server])
    
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
                <div className="searching" style={{color: searchingColor}}>
                    Searching...
                </div>
              )
            }
          </div>
      </div>
    )
}

export default MatchGetter;