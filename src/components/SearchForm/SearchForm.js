import { useContext, useState } from 'react';
import {Redirect} from 'react-router-dom'
import { RedirectContext } from '../../App';

export default function ({searchInput, setSearchInput, redirect, setRedirect}) {

    const darkModeData = useContext(RedirectContext)

    let buttonBackgroundColor = ''
    if (darkModeData.darkModeOn) {
        buttonBackgroundColor = 'rgba(19, 12, 117, 0.651)'
    } else {
        buttonBackgroundColor = 'black'
    }

    let fontColor = ''
    if (darkModeData.darkModeOn) {
        fontColor = 'white'
    } else {
        fontColor = 'black'
    }

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
            <label className="search-player-label" htmlFor="search-player" style={{color: fontColor}} >{darkModeData.servers[darkModeData.server]}:</label>
            <input className="search-player" type="text" id="search-player" placeholder="Player Name:" value={searchInput} onChange={handleInput}/>
            <input type="submit" value="Search" className="search-player-button" style={{backgroundColor: buttonBackgroundColor}} />
        </form>
    )
}