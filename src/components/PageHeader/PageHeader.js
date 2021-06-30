import SearchForm from "../SearchForm/SearchForm"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { RedirectContext } from "../../App"

export default function ({searchInput, setSearchInput, redirect, setRedirect}) {

    const darkModeData = useContext(RedirectContext)
    
    let headerBackgroundColor = ''
    if (darkModeData.darkModeOn) {
        headerBackgroundColor = 'black'
    } else {
        headerBackgroundColor = 'lightblue'
    }

    let leagueFinderTitleColor = ''
    if (darkModeData.darkModeOn) {
        leagueFinderTitleColor = 'white'
    } else {
        leagueFinderTitleColor = 'black'
    }

    return (
        <div className='header flex-container' style={{backgroundColor: headerBackgroundColor}}>
            <Link className='link-home' to='/' style={{color: leagueFinderTitleColor}}>
                <h1 className="league-finder">League Finder</h1>
            </Link>
            <SearchForm searchInput={searchInput} setSearchInput={setSearchInput} redirect={redirect} setRedirect={setRedirect} />
        </div>
    )
}