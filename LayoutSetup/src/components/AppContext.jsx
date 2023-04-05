import React from 'react';

export const AppContext = React.createContext({
    languageId: 'en',
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phoneNumber: '',
    avatar: null,
    country:'',
    isInPublicDirectory: false,
    biography: '',
    teamId: null,
    isLoggedIn: true,
    onLanguageChange: () => {},
    onProfileChange: () => {}
})

AppContext.displayName = 'AppContext';
