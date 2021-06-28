export default function PlayerChampion({champion}) {
    
    const imgPath = `./assets/champion/${champion}.png`

    return (
        <div>
            <img src={imgPath} width='40px' alt="" />
        </div>
    )
}