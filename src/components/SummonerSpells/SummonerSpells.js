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

export default function SummonerSpells({summonerSpells}) {
    
    const sum1ImgPath = `./assets/summonerspells/${summonerSpellMap[summonerSpells[0]]}.png`
    const sum2ImgPath = `./assets/summonerspells/${summonerSpellMap[summonerSpells[1]]}.png`

    return (
        <>
            <div><img src={sum1ImgPath} width='55px' alt="" /></div>
            <div><img src={sum2ImgPath} width='55px' alt="" /></div>
        </>
    )
}