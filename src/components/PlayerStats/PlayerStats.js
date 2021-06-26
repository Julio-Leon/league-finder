export default function PlayerStats({champion , kdaRatio}) {

    const imgPath = `./assets/champion/${champion}.png`

    return (
        <>  
            <div className="champion">
                <img src={imgPath} width='100px' alt="" />
            </div>
            <div className="player-KDA">
                {kdaRatio[0]}/{kdaRatio[1]}/{kdaRatio[2]}
            </div>
        </>
    )
}