import React from 'react';
import img from '../assets/delete.svg'

function Lista(props) {
    return (
        <li className={props.displayLi}>
            <span onClick={() => props.handleComplete(props.id)} style={{ textDecoration: props.complete ? 'line-through' : '' }}>{props.children}</span>
            <button onClick={() => props.handleDelete(props.id)}><img src={img} alt='delete' /></button>
        </li>
    )
}

export default Lista;