import React, { lazy, Suspense, Fragment } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'

import loader from '~/styles/transitions/loader.css';
const TrumpFirstYear = lazy(() => import('~/routes/politics/TrumpFirstYear'));

const sections = [
    {
        name: 'TrumpFirstYear',
        id: 'TrumpFirstYear'
    }
];

function Politics({match}) {
    return (
        <div>
            <h1>Topics</h1>
            <ul>
                {sections.map(({ name, id }) => (
                    <li key={id}>
                        <Link to={`${match.url}/${id}`}>{name}</Link>
                    </li>
                ))}
            </ul>
            
            <Suspense fallback={<div className={loader.crust__loader}></div>}>
                <Route path={`${match.path}/TrumpFirstYear/:typeId?`} component={TrumpFirstYear} />
            </Suspense>
        </div>
    )
}


export default Politics;