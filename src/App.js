import React from 'react';
import './styles/App.css';
import { Provider } from 'react-redux';
import { store } from  './store';
import GameZone from "./GameZone" ;

export default function App(){
    return (
        <Provider store={store}>
            <React.StrictMode>
                <GameZone store={store}/>
            </React.StrictMode>
        </Provider>
    )
}