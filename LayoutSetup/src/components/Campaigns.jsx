import * as React from 'react';

import { campaigns } from '../resources/campaigns';

const Campaigns = () => {

    // sets the data, our will be loaded from the API()
    const [data, setData] = React.useState(campaigns);

    return (
        <div id="Dashboard" className="dashboard-page main-content">
            <div className="card-container grid">
                <h3 className="card-title">Elephants in Zambia</h3>
            </div>
        </div>
    )
}

export default Campaigns;
