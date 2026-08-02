import Item from '../Item/Item'

export default function Items({items}) {

    const itemsList = []

    items.forEach(item => {
        if (!itemsList.includes(item)) {
            return itemsList.push(item)
        }
    });

    return (
        <>
            {
                itemsList.map((item, i) => {
                    return item > 0 ? <Item key={i} item={item}/> : <div key={i} className='item'><div className="empty-item"></div></div>
                })
            }
        </>
    )
}