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

    const handleInputName = e => {
        e.preventDefault()
        setSearchInput({
            ...searchInput,
            name: e.target.value
        })
        // console.log(searchInput)
    }

    const handleInputTag = e => {
        e.preventDefault()
        setSearchInput({
            ...searchInput,
            tag: e.target.value
        })
        // console.log(searchInput)s
    }


    const handleSubmit = e => {
        e.preventDefault()
        setRedirect(true)
    }
    
    if (redirect) return <Redirect to={'/' + searchInput.name + '/' + searchInput.tag} />


    //SEARCH INPUTS FOR ACCOUNT
    return (
        <form className="search-form flex-container" onSubmit={handleSubmit}>

            {/* NAME INPUT */}
            <label className="search-player-label" htmlFor="search-player" style={{color: fontColor}} ></label>
            <input className="search-player" type="text" id="search-player" placeholder="Player Name:" value={searchInput.name} onChange={handleInputName}/>
            
            {/* TAG INPUT */}
            <label className="search-player-label" htmlFor="tag" style={{color: fontColor}} ></label>
            <input name='tag' className="search-player" type="text" id="search-player" placeholder="Tag:" value={searchInput.tag} onChange={handleInputTag}/>
            
            <input type="submit" value="Search" className="search-player-button" style={{backgroundColor: buttonBackgroundColor}} />
        </form>
    )
}