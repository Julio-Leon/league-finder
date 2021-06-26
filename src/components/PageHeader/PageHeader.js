import SearchForm from "../SearchForm/SearchForm"

export default function ({setMatches, setPuuid, setSearchPlayer}) {
    return (
        <div className='header flex-container'>
            <h1 className="league-finder">League Finder</h1>
            <SearchForm setMatches={setMatches} setPuuid={setPuuid} setSearchPlayer={setSearchPlayer}/>
        </div>
    )
}