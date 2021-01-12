import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import { Provider } from 'react-redux';
import { store } from  './store/store';
import GameZone from "./GameZone" ;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <GameZone store={store}/>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);