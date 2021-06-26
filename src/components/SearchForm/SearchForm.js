import { useState } from 'react';

export default function ({setMatches, setPuuid, setSearchPlayer}) {

    const [searchInput, setSearchInput] = useState("")

    const handleInput = e => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setPuuid("")
        setMatches("")
        // console.log(searchInput)
        setSearchPlayer(searchInput)
        setSearchInput("")
    }

    return (
        <form className="search-form flex-container" onSubmit={handleSubmit}>
            <label className="search-player-label" htmlFor="search-player"></label>
            <input className="search-player" type="text" id="search-player" placeholder="Player Name:" value={searchInput} onChange={handleInput}/>
            <input type="submit" value="Search" className="search-player-button" />
        </form>
    )
}