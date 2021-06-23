import React from 'react';
import Container from './container';
import RoomNumber from './roomNumber';
import { hot } from 'react-hot-loader';
import "./room.css";

function Room(props) {
    let columns = [];
    columns.push(<RoomNumber number={props.number} key={"roomNumber: " + props.number}/>);

    for (let i = 0; i < props.columns; i++) {
        columns.push(<Container key={"x: " + i + "; y: " + props.y} x={i} y={props.y}/>);
    }

    let className = "room";
    if (props.y % 2 == 1) {
        className += " room-odd";
    }
    if (props.isFollowing) {
        className += " room-following";
    }

    return <div className={className}>{columns}</div>;
}

export default hot(module)(Room);