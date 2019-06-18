import React, { lazy, Suspense, Fragment } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'

import st from "~/app.css";
const TrumpFirstYear = lazy(() => import('~/routes/politics/TrumpFirstYear'));

const topics = [
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
                {topics.map(({ name, id }) => (
                    <li key={id}>
                        <Link to={`${match.url}/TrumpFirstYear`}>{name}</Link>
                    </li>
                ))}
            </ul>

            <Route path={`${match.path}/:typeId`} component={TrumpFirstYear} />
        </div>
    )
}


export default Politics;