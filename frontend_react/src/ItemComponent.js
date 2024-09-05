import React from 'react';
import './ItemComponent.css';

export default function ItemComponent(props) {
  const status = props.status;
  return (
    <li>
      {props.name} - 
      status: {status ? 
        <span className="status-finalizado">Finalizado</span> : 
        <span className="status-nao-finalizado">Nao Finalizado</span>}
    </li>
  );
}