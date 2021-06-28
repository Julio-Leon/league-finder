export default function PlayerItem({item}) {
    
    const imgPath = `./assets/item/${item}.png`

    return (
        <div>
            <img src={imgPath} width='30px' alt="" />
        </div>
    )
}