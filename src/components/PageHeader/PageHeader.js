import SearchForm from "../SearchForm/SearchForm"
import { Link } from "react-router-dom"

export default function ({searchInput, setSearchInput, redirect, setRedirect}) {
    return (
        <div className='header flex-container'>
            <Link className='link-home' to='/' >
                <h1 className="league-finder">League Finder</h1>
            </Link>
            <SearchForm searchInput={searchInput} setSearchInput={setSearchInput} redirect={redirect} setRedirect={setRedirect} />
        </div>
    )
}