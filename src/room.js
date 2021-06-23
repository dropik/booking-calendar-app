import React from 'react';
import Container from './Container';
import RoomNumber from './RoomNumber';
import { hot } from 'react-hot-loader';
import "./Room.css";

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

    return <div className={className}>{columns}</div>;
}

export default hot(module)(Room);