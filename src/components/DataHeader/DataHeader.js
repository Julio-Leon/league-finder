export default function DataHeader ({playerName, playerRank, playerTier, playerLeaguePoints}) {
    return (
        <div className='data-header flex-container'>
            <div>{playerName}</div>
            <div>{playerTier} {playerRank}</div>
            <div>{playerLeaguePoints} LP</div>
        </div>

    )
}