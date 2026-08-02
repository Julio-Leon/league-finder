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

  // ***FOR V5 USE***
  // const servers = {
  //   na1: 'NA',
  //   br1: 'BR',
  //   eun1: 'EUN',
  //   euw1: 'EUW',
  //   jp1: 'JP',
  //   kr: 'KR',
  //   la1: 'LAN',
  //   la2: 'LAS',
  //   oc1: 'OC',
  //   ru: 'RU',
  //   tr1: 'TR'
  // }

  const servers = {
    americas: 'Americas',
    europe: 'Europe',
    asia: 'Asia'
  }

  const [darkModeOn, setDarkModeOn] = useState(true)
  
  const [searchInput, setSearchInput] = useState({name: '', tag: ''})
  const [redirect, setRedirect] = useState(false)

  // ***FOR V5 USE***
  // const [server, setServer] = useState('na1')

  const [server, setServer] = useState('americas')

  const [corsFailed, setCorsFailed] = useState(false)

  const [invalidRedirect, setInvalidRedirect] = useState(false)

  useEffect(() => {
    setSearchInput({name: '', tag: ''})
    setRedirect(false)
    setInvalidRedirect(false)
  }, [redirect])

  useEffect(() => {
    console.log(server)
  }, [server])

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
      <RedirectContext.Provider value={{server, setServer, invalidRedirect, setInvalidRedirect, setSearchInput, searchInput, setRedirect, redirect, corsFailed, setCorsFailed, darkModeOn, setDarkModeOn}}>

      <header>
        <Route path='/' render={() => <PageHeader searchInput={searchInput} setSearchInput={setSearchInput} redirect={redirect} setRedirect={setRedirect} />} />
      </header>


      <CorsAlert />
        <main>
          <DarkModeButton />
          <ServerPicker />
          <Route path='/' exact component={IntroPage} />
          <Route path='/:name/:tag' exact component={MatchGetter} />
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
