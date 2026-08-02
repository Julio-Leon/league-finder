export default function PlayerChampion({champion}) {
    
    const imgPath = `https://ddragon.leagueoflegends.com/cdn/16.15.1/img/champion/${champion}.png`

    return (
        <div>
            <img src={imgPath} width='40px' alt="" />
        </div>
    )
}