import React, { lazy, Suspense, Fragment } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'

import st from "~/styles/app.css";
import loader from '~/styles/transitions/loader.css';
import Home from '~/routes/home';
const Politics = lazy(() => import('~/routes/politics'));

//class="(.+?)"
//className={st.$1}

const Crust = (props) => {
    return (
        <Router>
            <div className="thincrust__app">
                <div className={st.crust__header}>
                    <div className={st.header_container}>
                        <div className={st.crust_logo}>thincrust</div>
                        <ul className={st.header_sections}>
                            <Link to={'/'} key={'home'}>
                                <li className={st.header_section_item} data-id="nav-home">Home</li>
                            </Link>
                            <Link to={'/politics'} key={'politics'}>
                                <li className={st.header_section_item} data-id="nav-politics">Politics</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <Switch>
                <Suspense fallback={<div className={loader.crust__loader}></div>}>
                    <Route exact path="/" component={Home} />
                    <Route path="/politics" component={Politics}/>
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
    <Crust sections={sections} />,
    document.querySelector("#thincrust__root")
);