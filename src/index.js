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

const About = lazy(() => import('~/routes/about'));

const Politics = lazy(() => import('~/routes/politics'));
const TrumpFirstYear = lazy(() => import('~/routes/politics/TrumpFirstYear'));
const TrumpAcrossTime = lazy(() => import('~/routes/politics/TrumpAcrossTime'));
const Inside2020Democrats = lazy(() => import('~/routes/politics/Inside2020Democrats'))

const Dough = lazy(() => import('~/routes/dough'));
const DoughLDAEditor = lazy(() => import('~/routes/dough/ldaeditor'));

//class="(.+?)"
//className={st.$1}

const Crust = () => {
    return (
        <Router>
            <div className="thincrust__app">
                

            <Switch>
                <Suspense fallback={<div className={loader.crust__loader}></div>}>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route
                        path="/politics"
                        render={({ match: { url } }) => (
                            <>
                                <Route path={`${url}/`} component={Politics} exact />
                                <Route path={`${url}/TrumpFirstYear/:typeId?`} component={TrumpFirstYear} />
                                <Route path={`${url}/Inside2020/Democrats/:typeId?`} component={Inside2020Democrats} />
                                <Route path={`${url}/TrumpAcrossTime/:typeId?`} component={TrumpAcrossTime} />
                            </>
                        )}
                    />

                    <Route
                        path="/dough"
                        render={({ match: { url } }) => (
                            <>
                                <Route path={`${url}/`} component={Dough} exact />
                                <Route path={`${url}/ldaeditor/:typeId?`} component={DoughLDAEditor} />
                            </>
                        )}
                    />
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
        <Crust />
    </Provider>,
    document.querySelector("#thincrust__root")
);
