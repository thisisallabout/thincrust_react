import React, { lazy, Suspense, Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';

import loader from '~/styles/transitions/loader.css';
import store from '~/store';
import { APP_BACKGROUND_THEME } from '~/constants/actionTypes';
import { getCurrentBackgroundTheme } from '~/selectors/appBackgroundTheme';


const Inside2020Candidates = ({match, history, appTheme}) => {
    useEffect(() => {
        store.dispatch({ type: APP_BACKGROUND_THEME, state: { id: 'black' } })
    }, []);
    
    return (
        <div crust-apptheme={appTheme} style={ appTheme == 'black' ? {'backgroundColor': `#000`} : {'backgroundColor': `#fff`}}>
            <h1>Topics</h1>
        </div>
    )
}

const mapStateToProps = state => ({
    appTheme: getCurrentBackgroundTheme(state.crustState),
  });
  
export default connect(
    mapStateToProps
)(Inside2020Candidates);
  