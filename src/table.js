import React from 'react';
import { hot } from 'react-hot-loader';
import Row from './row.js';
import "./table.css";

function Table(props) {
    let rows = [];

    for (let i = 0; i < props.rows; i++) {
        let isFollowing = i > 0;
        rows.push(<Row columns={props.columns} isFollowing={isFollowing} y={i} key={i}/>);
    }

    return <div className="table">{rows}</div>;
}

export default hot(module)(Table);