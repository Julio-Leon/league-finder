import Match from "../Match/Match"

export default function ({puuid, matches}) {
    return (
        <div className="matches">
            {matches.map((match, i) => <Match key={i} puuid={puuid} match={match}/>)}
        </div>
    )
}