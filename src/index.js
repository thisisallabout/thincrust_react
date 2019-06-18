import React, { lazy, Suspense, Fragment } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'

import st from "~/app.css";
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
                <Suspense fallback={<div>Loading...</div>}>
                    <Route exact path="/" component={Home} />
                    <Route path={"/politic"} component={Politics} />
                    <Route path="/:id" component={Politics}/>
                </Suspense>
                </Switch>
            </div>
        </Router>
    );
}


function WaitingComponent(Component) {
    return props => (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
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