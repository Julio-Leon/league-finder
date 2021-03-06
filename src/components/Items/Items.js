import Item from '../Item/Item'

export default function Items({items}) {
    return (
        <>
            {
                items.map((item, i) => {
                    return <Item key={i} item={item}/>
                })
            }
        </>
    )
}