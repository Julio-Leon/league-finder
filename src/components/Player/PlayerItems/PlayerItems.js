import PlayerItem from "../PlayerItem/PlayerItem"

export default function PlayerItems({items}) {
    return (
        <div className='player-items flex-container'>
            {
                items.map((item, i) => {
                    return <PlayerItem key={i} item={item} />
                })
            }
        </div>
    )
}