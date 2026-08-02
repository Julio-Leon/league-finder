

export default function Item({item}) {

    const imgPath = `https://ddragon.leagueoflegends.com/cdn/16.15.1/img/item/${item}.png`

    return (
        <div className="item">
            <img src={imgPath} width='70%' style={{ padding: '0%', margin: '0%' }} alt={item} />
        </div>
    )
}