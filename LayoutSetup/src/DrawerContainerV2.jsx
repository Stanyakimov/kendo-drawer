import React, { useEffect } from 'react';
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { useLocalization } from '@progress/kendo-react-intl';
import { Header } from './Header';

export const items = [
    {
        text: 'Campaigns',
        selected: true,
        route: '/explore/campaigns',
        icon: 'k-i-grid'
    },
    {
        route: '/',
        disabled: true,
    }
];

export const DrawerContainerV2 = (props) => {
    const localizationService = useLocalization();
    const navigate = useNavigate();
    const location = useLocation();
    const [expanded, setExpanded] = React.useState(false);
    const isLoggedIn = true;

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

    // const localizationService = provideLocalizationService(this); // Results in bundle.js:64315 Uncaught Passed component - undefined is invalid.
    const selected = setSelectedItem(location.pathname);

    return (
        <div>
            <Header
                isLoggedIn={isLoggedIn}
                onButtonClick={handleClick} // on button click will expand or collaplse the drawer
                // page={`custom.${selected}`} // selected the current language from the dropdown
                page={localizationService.toLanguageString(`custom.${selected}`)} // selected the current language from the dropdown
            />
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

// registerForLocalization(DrawerContainerV2); // Results in bundle.js:19883 Warning: DrawerContainerV2: Function components do not support contextType.