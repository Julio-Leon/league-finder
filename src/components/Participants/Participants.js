import Participant from '../Participant/Participant'

export default function Participants({participants}) {
    return (
        <>
            {
                participants.map((participant, i) => {
                    return <Participant key={i} participant={participant} />
                })
            }
        </>
    )
}