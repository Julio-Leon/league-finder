export default function Item({item}) {

    const imgPath = `./assets/item/${item}.png`

    return (
        <div className="item">
            <img src={imgPath} width='96%' height='95%' alt={item} />
        </div>
    )
}