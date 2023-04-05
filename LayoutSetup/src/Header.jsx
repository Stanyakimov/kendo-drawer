import * as React from 'react';
import * as PropTypes from 'prop-types';

import { useLocalization } from '@progress/kendo-react-intl';
import { locales } from './resources/locales';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Avatar } from '@progress/kendo-react-layout';
import { AppContext } from './components/AppContext'
import { Alert } from './components/campaigns/Alert';
import { Link } from 'react-router-dom';

import headerBg from './assets/header-bg.png';
import userAvatar from './assets/user-avatar.jpg';

export const Header = (props) => {
    const { onButtonClick } = props;
    const { isLoggedIn } = props;
    // Use the context and take the avatar, the current language symbol and a function
    // of what's happening when the language changes 
    const { avatar, localeId, onLanguageChange } = React.useContext(AppContext); // isLoggedIn
    const localizationService = useLocalization();
    const render = true;
    // We use this value to create a dropdown list 
    const currentLanguage = locales.find(item => item.localeId === localeId);

    const imgRef = React.useRef(null);
    const hasImage = avatar && avatar.length > 0;

    React.useEffect(
        () => { // reads a file from the current file directory 
            if (hasImage) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    imgRef.current.setAttribute('src', e.target.result)
                }

                reader.readAsDataURL(avatar[0].getRawFile());
            }
        },
        [avatar, hasImage]
    );

    return (
        <header className="header" style={{ backgroundImage: `url(${headerBg})` }}>
            <div className="nav-container">
                {isLoggedIn &&
                    <>
                        <div className="menu-button">
                            <span className={'k-icon k-i-menu'} onClick={onButtonClick} />
                        </div>
                    </>}

                {/* The values come from message folder: custom.warehouse and custom.language */}
                <div className="title">
                    <Link to="/" style={{ color: '#FFFFFF', fontSize: '16px', fontFamily: 'Roboto',  }}>Discover</Link>
                    {/* There's possibility to move the localization service title to the components rendered */}
                </div>

                {isLoggedIn &&
                    <>
                        <div className="settings">
                            <div className="right-widget">
                                <div className="alert-container">
                                    <Alert />
                                </div>
                            </div>
                            <span>{localizationService.toLanguageString('custom.language')}</span>
                            <DropDownList
                                textField={'locale'}
                                dataItemKey={'localeId'}
                                data={locales}
                                value={currentLanguage}
                                onChange={onLanguageChange}
                            />
                            <Avatar type={'image'} shape={'circle'}>
                                {
                                    // If the user has an image then take his avatar and set it if not use a predefined local asset
                                    hasImage ?
                                        <img ref={imgRef} src={'#'} alt={'User Avatar'} /> :
                                        <img src={userAvatar} alt="user-avatar" />
                                }
                            </Avatar>
                        </div>
                    </>
                }
                {!isLoggedIn &&
                    <>
                        <div className="settings">
                            <div className="right-widget">
                                <Link to="/login" style={{ color: '#FFFFFF', fontSize: '16px', fontFamily: 'Roboto', marginRight: '2em' }}>Log in</Link>
                                <Link to="/login" style={{ color: '#FFFFFF', fontSize: '16px', fontFamily: 'Roboto', marginRight: '5em' }}>Sign up</Link>
                            </div>
                        </div>
                    </>}
            </div>
        </header>
    );
}

Header.displayName = 'Header';
Header.propTypes = {
    page: PropTypes.string,
    onButtonClick: PropTypes.func
};

