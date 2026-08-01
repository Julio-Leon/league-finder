export default function Item({item}) {

    const imgPath = `https://ddragon.leagueoflegends.com/cdn/16.15.1/img/item/${item}.png`

    console.log(item)

    return (
        <div className="item">
            <img src={imgPath} width='96%' height='95%' alt={item} />
        </div>
    )
}