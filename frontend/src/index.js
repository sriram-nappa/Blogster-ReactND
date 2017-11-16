import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const debug = true;

let middleware = applyMiddleware(thunk);

if(debug) {
    middleware = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
console.log(typeof rootReducer)
const store = createStore(
    rootReducer,
    middleware
);
const muiTheme = getMuiTheme({
    palette: {
        textColor: '#FFFFFF'
    },
    appBar: {
        height: 50
    }
})

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>       
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
