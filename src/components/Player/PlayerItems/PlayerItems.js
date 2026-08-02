import PlayerItem from "../PlayerItem/PlayerItem"

export default function PlayerItems({items}) {

    const itemsList = []

    items.forEach(item => {
        if (!itemsList.includes(item)) {
            return itemsList.push(item)
        }
    });

    return (
        <div className='player-items flex-container'>
            {
                itemsList.map((item, i) => {
                    return item > 0 ? <PlayerItem key={i} item={item}/> : <div key={i} className='player-items'><div className="player-empty-item"></div></div>
                })
            }
        </div>
    )
}