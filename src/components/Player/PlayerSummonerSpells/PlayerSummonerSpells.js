const summonerSpellMap = {
    21: 'SummonerBarrier',
    1: 'SummonerBoost',
    14: 'SummonerDot',
    3: 'SummonerExhaust',
    4: 'SummonerFlash',
    6: 'SummonerHaste',
    7: 'SummonerHeal',
    11: 'SummonerSmite',
    12: 'SummonerTeleport'
}

export default function PlayerSummonerSpells({summoner1, summoner2}) {

    const imgPath1 = `https://ddragon.leagueoflegends.com/cdn/16.15.1/img/spell/${summonerSpellMap[summoner1]}.png`
    const imgPath2 = `https://ddragon.leagueoflegends.com/cdn/16.15.1/img/spell/${summonerSpellMap[summoner2]}.png`

    return (
        <>
            <div className="player-info-summoner-one">
                <img src={imgPath1} width='17.5px' alt="" />
            </div>
            <div className="player-info-summoner-two">
                <img src={imgPath2} width='17.5px' alt="" />
            </div>
        </>
    )
}