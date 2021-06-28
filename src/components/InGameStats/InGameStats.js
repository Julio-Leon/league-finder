export default function InGameStats({level, creepScore, goldEarned}) {
    return (
        <>
            <div className="level">
                Level {level}
            </div>
            <div className="cree-score">
                {creepScore} CS
            </div>
            <div className="gold-earned">
                {goldEarned} Gold
            </div>
        </>
    )
}