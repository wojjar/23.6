import React, {PropTypes} from 'react';
import Lane from './LaneContainer.js';


const Lanes = ({ lanes }) => {
    console.log('lanes.js comp: lanes: ', lanes)
    return (
        <div className="lanes"> {lanes.map(lane => 
            <Lane className="lane" key={lane.id} lane={lane} />
        )} </div>
    )
}


Lanes.PropTypes = {
    lanes: PropTypes.array
}

export default Lanes;
