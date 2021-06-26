export default function DataHeader ({playerName, playerRank, playerTier, playerLeaguePoints, playerIcon}) {

    const imgPath = `./assets/profileicon/${playerIcon}.png`

    return (
        <div className='data-header flex-container'>
            <div className='profile flex-container'>
                <div>
                    <img src={imgPath} width='100px' className='profile-icon' alt="" />
                </div>
                <div className='player-name'>{playerName}</div>
            </div>
            <div>{playerTier} {playerRank}</div>
            <div>{playerLeaguePoints} LP</div>
        </div>

    )
}