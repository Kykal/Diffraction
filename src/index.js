import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//i18next
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

//i18next - languages
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";


i18next.init({
  interpolation: {escapeValue: false},

  lng: "en", //Web site default language will be 'en' (english)

  resources: {
    es: { global: global_es },
    en: { global: global_en }
  },



});


ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
