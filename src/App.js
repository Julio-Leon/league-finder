import { useState, useEffect, createContext } from 'react';

import './style.css'

import matchesData from './test-data/test-matches'

import Matches from './components/Matches/Matches';
import PageHeader from './components/PageHeader/PageHeader';
import DataHeader from './components/DataHeader/DataHeader';

// API VARIABLES
const MY_API_KEY = "RGAPI-46147d72-e9df-4ebc-856c-6729eacbfbe8"
const API_KEY = "api_key=" + MY_API_KEY

const BY_PLAYER_NAME_ENDPOINT = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"

const GET_MATCHES_BY_PUUID_ENDPOINT_ONE = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"

const GET_MATCH_DATA_WITH_ID_ENDPOINT = "https://americas.api.riotgames.com/lol/match/v5/matches/"

const GET_SOLO_QUEUE_DATA_ENDPOINT = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/"

export const DataContext = createContext()

function App() {
  
  const [userName, setUserName] = useState("")
  const [matches, setMatches] = useState("")
  const [searchPlayer, setSearchPlayer] = useState("")
  const [puuid, setPuuid] = useState("")
  const [id, setId] = useState("")
  const [soloQ, setSoloQ] = useState("")

  const [playerIcon, setPlayerIcon] = useState('')
  
  const player = {
    matches,
    searchPlayer,
    puuid,
    id,
  }

  const getPlayerData = async () => {
    const playerName = player.searchPlayer + "?"
    setUserName(player.searchPlayer)
    if (playerName === "?") {
      return
    }
    const playerMatchesData = []
    try {
      const nameResponse = await fetch(BY_PLAYER_NAME_ENDPOINT + playerName + API_KEY)
      const nameData = await nameResponse.json()
      
      setId(nameData.id)
      setPuuid(nameData.puuid)

      // GETTING ACCOUNT INFO
      const playerInfoResponse = await fetch(GET_SOLO_QUEUE_DATA_ENDPOINT + nameData.id + '?' + API_KEY)
      const playerInfo = await playerInfoResponse.json()

      // console.log(playerName, playerInfo[0].rank, playerInfo[0].tier, playerInfo[0].leaguePoints)

      setSoloQ({
        rank: playerInfo[0].rank,
        tier: playerInfo[0].tier,
        leaguePoints: playerInfo[0].leaguePoints
      })

      console.log(playerInfo[0])
      
      // GETTING MATCHES
      let startCount = 0
      let endCount = 10
      while (playerMatchesData.length < 10) {
        const matchesIDsResponse = await fetch(GET_MATCHES_BY_PUUID_ENDPOINT_ONE + nameData.puuid + `/ids?start=${startCount.toString()}&count=${endCount.toString()}&` + API_KEY)

        // console.log(matchesIDsResponse)
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
      // console.log(playerMatchesData)
      setMatches(playerMatchesData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPlayerData()
  }, [searchPlayer])

  return (
    <div className="App flex-container">

      <div>
        <PageHeader setMatches={setMatches} setPuuid={setPuuid} setSearchPlayer={setSearchPlayer}/>
      </div>

      <div className="data-container flex-container">
          { matches ? (
              <DataHeader playerName={searchPlayer} playerRank={soloQ.rank} playerTier={soloQ.tier} playerLeaguePoints={soloQ.leaguePoints} playerIcon={playerIcon} />
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
                <p>No Player Being Searched...</p>
              )
            }
          </div>
      </div>

    </div>
  );
}

export default App;
