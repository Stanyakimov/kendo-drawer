import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { AppContext } from './components/AppContext';
import Campaigns from './components/Campaigns/Campaigns';
import { Home } from './components/Home';
import { Explore } from './components/Explore';

import { countries } from './resources/countries';
import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';

import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';

import frNumbers from 'cldr-numbers-full/main/fr/numbers.json';
import frLocalCurrency from 'cldr-numbers-full/main/fr/currencies.json';
import frCaGregorian from 'cldr-dates-full/main/fr/ca-gregorian.json';
import frDateFields from 'cldr-dates-full/main/fr/dateFields.json';

import usNumbers from 'cldr-numbers-full/main/en/numbers.json';
import usLocalCurrency from 'cldr-numbers-full/main/en/currencies.json';
import usCaGregorian from 'cldr-dates-full/main/en/ca-gregorian.json';
import usDateFields from 'cldr-dates-full/main/en/dateFields.json';

import esNumbers from 'cldr-numbers-full/main/es/numbers.json';
import esLocalCurrency from 'cldr-numbers-full/main/es/currencies.json';
import esCaGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import esDateFields from 'cldr-dates-full/main/es/dateFields.json';

import { enMessages } from './messages/en-US';
import { frMessages } from './messages/fr';
import { esMessages } from './messages/es';

import 'hammerjs';
import './App.scss';

// Loads the CLDRs
load(
  likelySubtags,
  currencyData,
  weekData,
  frNumbers,
  frLocalCurrency,
  frCaGregorian,
  frDateFields,
  usNumbers,
  usLocalCurrency,
  usCaGregorian,
  usDateFields,
  esNumbers,
  esLocalCurrency,
  esCaGregorian,
  esDateFields
);

// Load the messages for each specific language
loadMessages(esMessages, 'es');
loadMessages(frMessages, 'fr');
loadMessages(enMessages, 'en-US');

const App = () => {
  // Sets the current context state to the user - I should call my API on load and set the current user
  const [contextState, setContextState] = React.useState({
    localeId: 'en-US',
    firstName: 'Peter',
    lastName: 'Douglas',
    middleName: '',
    email: 'peter.douglas@progress.com',
    phoneNumber: '(+1) 8373-837-93-02',
    avatar: null,
    country: countries[33].name,
    isInPublicDirectory: true,
    biography: '',
    teamId: 1,
    isLoggedIn: true
  });

  const onLanguageChange = React.useCallback(
    (event) => { setContextState({ ...contextState, localeId: event.value.localeId }) },
    [contextState, setContextState]
  );

  const onProfileChange = React.useCallback(
    (event) => {
      setContextState({ ...contextState, ...event.dataIte });
    },
    [contextState, setContextState]
  );

  return (
    <div className="App">
      <LocalizationProvider language={contextState.localeId}> {/* responsible for formatting of dates and numbers */}
        <IntlProvider locale={contextState.localeId}>{/* responsible for translating messages */}
          <AppContext.Provider value={{ ...contextState, onLanguageChange, onProfileChange }}>
            <Routes>
              {/* Marketing Page - Stories of people with changed lives */}
              <Route path="/" element={<Home />} />

              {/* {The rf element introduces the drawer } */}
              <Route path='/rf' element={<Home/>} />
              {/* /explore is for the Donors + donators  */}
              <Route path="/explore" element={<Explore />}>
                  {/* Software - campaigns - to review your org campaigns*/}
                  {/* Software - Start a campaigns - to start a new campaign */}
                <Route path="/explore/campaigns" element={<Campaigns />} />
              </Route>
            </Routes>
          </AppContext.Provider>
        </IntlProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
