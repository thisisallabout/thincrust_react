import React, { lazy, Suspense, Fragment } from "react";
import ReactDOM from "react-dom";

const App = lazy(() => import("./components/app"));
ReactDOM.render(
    <Suspense fallback={<p>...</p>}>
        <App />
    </Suspense>,
    document.querySelector("#root")
);