import React, { useState } from 'react';
import Utils from './utils';

const StarsDisplay = props => (
    <>
        {Utils.range(1, props.count).map(starId =>
                <div key={starId} className="star" />
        )}
    </>
)

export default StarsDisplay;