import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

var firebaseConfig = {
    apiKey: "AIzaSyDxYuwUSyzU-q14Dc5G8h0Hyb98PO5W0s0",
    authDomain: "spark-esport.firebaseapp.com",
    databaseURL: "https://spark-esport.firebaseio.com",
    projectId: "spark-esport",
    storageBucket: "spark-esport.appspot.com",
    messagingSenderId: "234529001649",
    appId: "1:234529001649:web:3afcb63fb70333251e1290",
    measurementId: "G-KP5RGHT96J"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
