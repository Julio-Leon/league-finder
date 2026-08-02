export default function PlayerItem({item}) {
    
    const imgPath = `https://ddragon.leagueoflegends.com/cdn/16.15.1/img/item/${item}.png`

    return (
        <>
            <img src={imgPath} width='30px' alt="" />
        </>
    )
}