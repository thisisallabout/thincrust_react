import React, { lazy, Suspense, Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Provider, connect } from 'react-redux';

//redux
import store from '~/store';

import st from "~/styles/app.css";
import loader from '~/styles/transitions/loader.css';
import Home from '~/routes/home';
import AppHeader from '~/components/appHeader';
import { APP_BACKGROUND_THEME } from '~/constants/actionTypes';
import getCurrentBackgroundTheme from '~/selectors/appBackgroundTheme';

const Politics = lazy(() => import('~/routes/politics'));
const TrumpFirstYear = lazy(() => import('~/routes/politics/TrumpFirstYear'));

//class="(.+?)"
//className={st.$1}

const Crust = () => {
    return (
        <Router>
            <div className="thincrust__app">
                <AppHeader />

                <Switch>
                    <Suspense fallback={<div className={loader.crust__loader}></div>}>
                        <Route exact path="/" component={Home} />
                        <Route path="/politics/TrumpFirstYear" render={
                            props => <TrumpFirstYear {...props} onThemeChanges={() => changeAppThemeState()} /> } /> 
                        <Route path="/politics" component={Politics} />
                    </Suspense>
                </Switch>
            </div>
        </Router>
    );
}

const sections = [
    { id: 'nav-section-today', name: 'Today', path: '/' },
    { id: 'nav-section-politics', name: 'Politics', path: '/politics' }
];

ReactDOM.render(
    <Provider store={store}>
        <Crust onThemeChanges={() => onThemeChanges()} />
    </Provider>,
    document.querySelector("#thincrust__root")
);