import { useState } from 'react';
import {Redirect} from 'react-router-dom'

export default function ({searchInput, setSearchInput, redirect, setRedirect}) {

    const handleInput = e => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setSearchInput("/" + searchInput)
        setRedirect(true)
    }
    
    if (redirect) return <Redirect to={searchInput} />

    return (
        <form className="search-form flex-container" onSubmit={handleSubmit}>
            <label className="search-player-label" htmlFor="search-player"></label>
            <input className="search-player" type="text" id="search-player" placeholder="Player Name:" value={searchInput} onChange={handleInput}/>
            <input type="submit" value="Search" className="search-player-button" />
        </form>
    )
}