import React from 'react';
import Container from './container';
import { hot } from 'react-hot-loader';
import "./row.css";

function Row(props) {
    let columns = [];

    for (let i = 0; i < props.columns; i++) {
        let isFollowing = i > 0;
        columns.push(<Container isFollowing={isFollowing} isRowFollowing={props.isFollowing} key={"x: " + i + "; y: " + props.y} x={i} y={props.y}/>);
    }

    return <div className="row">{columns}</div>;
}

export default hot(module)(Row);