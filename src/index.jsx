import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { pageurl } from './utils/constants';
import { Provider } from 'react-redux';
import store from './store';
import reportWebVitals from './reportWebVitals';

const Loading = lazy(() => import('./components/loading'));
const WeatherInfo = lazy(() => import('./components/weather-info'));

const Routes = () => (
    <Router>
        <Switch>
            <Suspense fallback={<div>Loading...</div>}>
                <Route path={pageurl.LOADING} component={Loading} />
                <Route path={pageurl.WEATHERINFO} component={WeatherInfo} />
            </Suspense>
        </Switch>
    </Router>
);

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();