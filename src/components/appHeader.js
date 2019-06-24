import { connect } from 'react-redux';
import React, { lazy, Suspense, Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'

import { getCurrentBackgroundTheme } from '~/selectors/appBackgroundTheme';

import store from '~/store';
import { APP_BACKGROUND_THEME } from '~/constants/actionTypes';
import st from "~/styles/app.css";

const AppHeader = ({ appTheme }) => {
    const onEnterSetTheme = () => {
        store.dispatch({ type: APP_BACKGROUND_THEME, state: { id: 'white' } })
    }
    
    return (
    <div className={st.header_container} crust-apptheme={appTheme}>
        <Link to={'/'} key={'home'}>
            <div className={st.crust_logo} onClick={onEnterSetTheme}>thincrust</div>
        </Link>
        <ul className={st.header_sections}>
            <Link to={'/politics/TrumpFirstYear'} key={'TrumpFirstYear'}>
                <li className={st.header_section_item} data-id="nav-politics">TrumpFirstYear</li>
            </Link>
            <Link to={'/politics/Inside2020Candidates'} key={'Inside2020Candidates'}>
                <li className={st.header_section_item} data-id="nav-politics">Inside2020Candidates</li>
            </Link>
            <Link to={'/politics'} key={'politics'}>
                <li className={st.header_section_item} data-id="nav-politics">Politics</li>
            </Link>
        </ul>
    </div>
    )
}

const mapStateToProps = state => ({
  appTheme: getCurrentBackgroundTheme(state.crustState),
});

export default connect(
  mapStateToProps
)(AppHeader);
