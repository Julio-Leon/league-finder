import { useState, useEffect, createContext } from 'react';

import './style.css'

import {Route} from 'react-router-dom'

import PageHeader from './components/PageHeader/PageHeader';
import InvalidName from './components/InvalidName/InvalidName';
import MatchGetter from './components/MatchGetter/MatchGetter';
import IntroPage from './components/IntroPage/Intropage';
import ServerPicker from './components/ServerPicker/ServerPicker';
import CorsAlert from './components/CorsAlert/CorsAlert'
import DarkModeButton from './components/DarkModeButton/DarkModeButton';

export const RedirectContext = createContext()

function App() {

  const servers = {
    na1: 'NA',
    br1: 'BR',
    eun1: 'EUN',
    euw: 'EUW',
    jp1: 'JP',
    kr: 'KR',
    la1: 'LAN',
    la2: 'LAS',
    oc1: 'OC',
    ru: 'RU',
    tr1: 'TR'
  }

  const [darkModeOn, setDarkModeOn] = useState(false)
  
  const [searchInput, setSearchInput] = useState("")
  const [redirect, setRedirect] = useState(false)

  const [server, setServer] = useState('na1')

  const [corsFailed, setCorsFailed] = useState(false)

  const [invalidRedirect, setInvalidRedirect] = useState(false)

  useEffect(() => {
    setSearchInput('')
    setRedirect(false)
    setInvalidRedirect(false)
  }, [redirect])

  let appBackgroundColor = ''
  if (darkModeOn) {
    appBackgroundColor = '#192734'
  } else {
    appBackgroundColor = 'white'
  }

  let copyrightColor = ''
  if (darkModeOn) {
    copyrightColor = 'white'
  } else {
    copyrightColor = 'black'
  }

  return (
    <div className="App flex-container" style={{backgroundColor: appBackgroundColor}}>
      <RedirectContext.Provider value={{invalidRedirect, setInvalidRedirect, setSearchInput, searchInput, setRedirect, redirect, server, setServer, corsFailed, setCorsFailed, darkModeOn, setDarkModeOn, servers}}>

      <header>
        <Route path='/' render={() => <PageHeader searchInput={searchInput} setSearchInput={setSearchInput} redirect={redirect} setRedirect={setRedirect} />} />
      </header>


      <CorsAlert />
        <main>
          <DarkModeButton />
          <ServerPicker />
          <Route path='/' exact component={IntroPage} />
          <Route path='/:name' exact component={MatchGetter} />
          <Route path='/invalid-name' exact component={InvalidName} />
        </main>

      <footer  style={{backgroundColor: appBackgroundColor}}>
        <p style={{color: copyrightColor}}>
          Copyright © All Rights Reserved 2021
          Created by Julio Leon
        </p>
      </footer>
      </RedirectContext.Provider>

    </div>
  );
}

export default App;
