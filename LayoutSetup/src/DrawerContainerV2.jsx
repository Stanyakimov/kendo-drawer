import React, { useEffect } from 'react';
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { registerForLocalization, provideLocalizationService }
    from '@progress/kendo-react-intl';
import { Alert } from './components/campaigns/Alert';
import { Button } from '@progress/kendo-react-buttons';
import { Header } from './Header';


export const items = [
    {
        text: 'Campaigns',
        selected: true,
        route: '/org/campaigns',
        icon: 'k-i-grid'
    }
];

export const DrawerContainerV2 = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [expanded, setExpanded] = React.useState(true);
    const [localizationService, setLocalizationService] = React.useState(null);
    const [selected, setSelected] = React.useState(null);


    const handleClick = () => {
        setExpanded(!expanded);
    }

    const onSelect = (e) => {
        navigate(e.itemTarget.props.route);
    };

    // Takes the current pathName and return what should be set as a title
    const setSelectedItem = (pathName) => {
        let currentPath = items.find((item) => item.route === pathName);
        if (currentPath.text) {
            return currentPath.text;
        }
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        setLocalizationService(provideLocalizationService(this));
        setSelected(setSelectedItem(location.pathname));
    }, []);


    return (
        <div>
            <Header
                onButtonClick={this.handleClick} // on button click will expand or collaplse the drawer
                page={localizationService.toLanguageString(`custom.${selected}`)} // selected the current language from the dropdown
            // page={localizationService.toLanguageString(`custom.${selected}`)} // selected the current language from the dropdown
            />
            <div className="custom-toolbar">
                <Button icon="menu" onClick={this.handleClick} />
                <span className="overview">{selected === 'Campaigns' ? 'Overview' : selected}</span>
                <div className="right-widget">
                    <div className="alert-container">
                        <Alert />
                    </div>
                    <Link to="/" style={{ color: '#424242', fontWeight: '400', fontSize: '14px', fontFamily: 'Roboto', marginTop: '3px' }}>About</Link>
                </div>
            </div>

            <div classNmae='right-widget'>
                <div className='alert-container'>
                    <Alert />
                </div>
                <Link to="/home" style={{ color: '#424242', fontWeight: '400', fontSize: '14px', fontFamily: 'Roboto', marginTop: '3px' }}>Discover</Link>
            </div>
            <Drawer
                expanded={expanded}
                position={'start'}
                mode={'push'}
                width={240}
                items={items.map((item) => ({
                    ...item,
                    selected: item.text === selected,
                }))}
                onSelect={onSelect}
                className="drawer"
            >
                <DrawerContent>{props.children}<Outlet /></DrawerContent>
            </Drawer>
        </div>
    )
}
// }

registerForLocalization(DrawerContainerV2);