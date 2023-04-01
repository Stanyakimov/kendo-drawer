import React from 'react';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { registerForLocalization, provideLocalizationService } from '@progress/kendo-react-intl';
import { Header } from './Header';
import { withRouter } from 'react-router-dom';

const items = [
    { name: 'campaigns', icon: 'k-i-grid', selected: true, route: '/' },
    // { name: 'Create Campaigns', icon: 'k-i-grid', route: '/create-campaign' },
    { separator: true },
    // { name: 'Social Feed', icon: 'k-i-user', route: '/social-feed' },
];

class DrawerRouterContainer extends React.Component {
    state = {
        expanded: false,
        selectedId: items.findIndex(x => x.selected === true),
        isSmallerScreen: window.innerWidth < 768
    }

    resizeWindow = () => {
        this.setState({ isSmallerScreen: window.innerWidth < 768 })
    }

    // Handles a click on the drawer and set the drawer from open to close and vice versa
    handleClick = () => {
        this.setState((e) => ({ expanded: !e.expanded }));
    }

    // sets the selected item id, collapse the drawer and push the current route to the history
    handleSelect = (e) => {
        this.setState({ selectedId: e.itemIndex, expanded: false });
        this.props.history.push(e.itemTarget.props.route);
    }

    // takes a pathname and returns a name which then sets into the Header
    getSelectedItem = (pathName) => {
        let currentPath = items.find(item => item.route === pathName);
        if (currentPath.name) {
            return currentPath.name;
        }
    }

    // Why do we use this?
    componentDidUpdate() {
        try {
            const parent = window.parent;
            if (parent) {
                parent.postMessage({ url: this.props.location.pathname, demo: true }, "*")
            }
        } catch (err) {
            console.warn('Cannot access iframe')
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeWindow, false);
        this.resizeWindow();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeWindow)
    }

    render() {
        let selected = this.getSelectedItem(this.props.location.pathname);
        const localizationService = provideLocalizationService(this);

        return (
            <React.Fragment>
                <Header
                    onButtonClick={this.handleClick} // on button click will expand or collaplse the drawer
                    page={localizationService.toLanguageString(`custom.${selected}`)} // selected the current language from the dropdown
                />
                <Drawer // Creates a kendo drawer element 
                    expanded={this.state.expanded} // takes the state of the current component and set it to the drawer
                    animation={{ duration: 100 }}
                    items={items.map((item) => ({ // TODO: ask the support 
                        ...item,
                        text: localizationService.toLanguageString(`custom.${item.name}`),
                        selected: item.name === selected
                    }))
                    }
                    position='start' // states wether the drawer will be on the left or the right side
                    mode={this.state.isSmallerScreen ? 'overlay' : 'push'} // if the screen is small use overlay, otherwise push the content
                    mini={this.state.isSmallerScreen ? false : true}

                    onOverlayClick={this.handleClick} // sets the drawer from open to close and vice versa
                    onSelect={this.handleSelect}
                >
                    <DrawerContent style={{ height: 1066 }}>
                        {this.props.children} 
                    </DrawerContent>
                </Drawer>
            </React.Fragment>
        );
    }
};

registerForLocalization(DrawerRouterContainer);

export default withRouter(DrawerRouterContainer);