import * as React from 'react';

import { campaigns } from '../resources/campaigns';
import {
    Card, CardHeader, CardTitle, CardBody, CardImage, CardFooter,
} from '@progress/kendo-react-layout';
import { ChunkProgressBar } from '@progress/kendo-react-progressbars';


const Campaigns = () => {

    // sets the data, our will be loaded from the API()
    const [data, setData] = React.useState(campaigns);

    const emptyStyles = {
        background: 'pink'
    };
    const blueColor = `rgb(39, 47, 120)`;
    const progressStyles = {
        background: 'royalBlue'
    };

    return (
        <div id="Dashboard" className="dashboard-page main-content">
            <div className="card-container grid">
                {data.map(cmp => (
                    // Recommended image size: 1920 x 1005 px
                    <Card key={cmp.id} orientation="vertical" style={{
                        // width: "25em",
                    }}>
                        <CardImage src={cmp.mediaUrl} style={{
                            // height: "15em",
                            // maxWidth: "100%",
                        }} />
                        <CardHeader>
                            <CardTitle>{cmp.title}</CardTitle>
                            <ChunkProgressBar
                                value={cmp.totalRaised}
                                max={cmp.amountToRaise}
                                emptyStyle={emptyStyles} progressStyle={progressStyles}
                            />
                            <CardFooter className="card-footer">{cmp.endDate}</CardFooter>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Campaigns;
