import * as React from 'react';

import { campaigns } from '../../resources/campaigns';
import {
    Card, CardHeader, CardTitle, CardBody, CardImage, CardFooter, CardSubtitle,
} from '@progress/kendo-react-layout';

import { ChunkProgressBar } from '@progress/kendo-react-progressbars';

const Campaigns = () => {
    // sets the data, our will be loaded from the API()
    const [data] = React.useState(campaigns);

    const emptyStyles = {
        background: 'pink'
    };
    const progressStyles = {
        background: 'royalBlue'
    };

    function isWhatPercentOf(x, y) {
        return ((x / y) * 100).toFixed(0);
    }

    // This function doesn't use the internationalization service provided by kendo
    // We take the curent locale and we parse the date based on the globalization settings 
    function formatDate(date) {
        var dateObject = new Date(date);
        var today = new Date();

        // request a weekday along with a long date
        if (dateObject.getFullYear() === today.getFullYear()) {
            var options = { month: 'long', day: 'numeric' };
            return dateObject.toLocaleDateString("en-US", options);
        } else {
            options = { year: 'numeric', month: 'long', day: 'numeric' };
            return dateObject.toLocaleDateString("en-US", options);
        }
    }

    return (
        <div id="Dashboard" className="dashboard-page main-content">
            <div className="card-container grid">

                {data.map(cmp => (
                    // Recommended image size: 1920 x 1005 px
                    <Card className="card-style" key={cmp.id} orientation="vertical" style={{
                        // width: "25em",
                    }}>
                        <CardImage src={cmp.mediaUrl} style={{
                            // height: "15em",
                            // maxWidth: "100%",
                        }} />
                        <CardHeader>
                            <CardTitle>{cmp.title}</CardTitle>
                            <CardSubtitle>Campaign Completeness: {isWhatPercentOf(cmp.totalRaised, cmp.amountToRaise)}%</CardSubtitle>
                            <span className='k-card-subtitle' style={{ float: 'right' }}>{formatDate(cmp.endDate)}</span>

                            <CardBody style={{ paddingLeft: '0px' }}>
                                <ChunkProgressBar
                                    style={{ marginTop: '0.5em' }}
                                    value={cmp.totalRaised}
                                    max={cmp.amountToRaise}
                                    chunkCount={10}
                                    emptyStyle={emptyStyles} progressStyle={progressStyles}
                                />
                            </CardBody>
                            <CardFooter style={{ paddingLeft: '0px' }}>
                                <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary">
                                    Review
                                </button>
                                <ul className='social-interactions'>
                                    <li className='k-icon k-i-eye' style={{ marginLeft: '4em' }}>1450</li>
                                    <li className='k-icon k-i-fav-outline'>365</li>
                                    <li className='k-icon k-i-comment'>16</li>
                                </ul>
                            </CardFooter>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Campaigns;
