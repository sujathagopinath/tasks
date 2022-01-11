import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './components/i18n/locales/config';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/Store/store';


ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={(<div>Loading ....</div>)}>
      <Provider store={store}>
      <App />
    </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
