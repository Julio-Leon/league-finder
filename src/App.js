import { useState, useEffect, createContext } from 'react';

import './style.css'

import {Route} from 'react-router-dom'

import PageHeader from './components/PageHeader/PageHeader';
import InvalidName from './components/InvalidName/InvalidName';
import MatchGetter from './components/MatchGetter/MatchGetter';
import IntroPage from './components/IntroPage/Intropage';

export const RedirectContext = createContext()

function App() {
  
  const [searchInput, setSearchInput] = useState("")
  const [redirect, setRedirect] = useState(false)

  const [invalidRedirect, setInvalidRedirect] = useState(false)

  useEffect(() => {
    setSearchInput('')
    setRedirect(false)
    setInvalidRedirect(false)
  }, [redirect])

  return (
    <div className="App flex-container">

      <header>
        <Route path='/' render={() => <PageHeader searchInput={searchInput} setSearchInput={setSearchInput} redirect={redirect} setRedirect={setRedirect} />} />
      </header>

      <RedirectContext.Provider value={{invalidRedirect, setInvalidRedirect, setSearchInput, searchInput, setRedirect, redirect}}>
        <main>
          <Route path='/' exact component={IntroPage} />
          <Route path='/:name' exact component={MatchGetter} />
          <Route path='/invalid-name' exact component={InvalidName} />
        </main>
      </RedirectContext.Provider>

      <footer>
        <p>
          Copyright © All Rights Reserved 2021
          Created by Julio Leon
        </p>
      </footer>

    </div>
  );
}

export default App;
