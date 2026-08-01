export default function PlayerStats({champion , kdaRatio}) {

    return (
        <>  
            <div className="champion">
                <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`} width='100px' alt="" />
            </div>
            <div className="player-KDA">
                {kdaRatio[0]}/{kdaRatio[1]}/{kdaRatio[2]}
            </div>
        </>
    )
}