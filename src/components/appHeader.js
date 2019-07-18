import { connect } from 'react-redux';
import React, { lazy, Suspense, Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import classnames from 'classnames';

import { getCurrentBackgroundTheme } from '~/selectors/appBackgroundTheme';

import store from '~/store';
import { APP_BACKGROUND_THEME } from '~/constants/actionTypes';
import st from "~/styles/app.css";

const AppHeader = ({ appTheme }) => {
    const [isWindowScrolled, setIsWindowScrolled] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', appHeaderScroll);
    }, [])

    const appHeaderScroll = (e) => {
        if (document.documentElement.scrollTop >= 150) {
            setIsWindowScrolled(true);
        } else if (document.documentElement.scrollTop < 150) {
            setIsWindowScrolled(false);
        }
    }

    const onEnterSetTheme = () => {
        store.dispatch({ type: APP_BACKGROUND_THEME, state: { id: 'white' } })
    }

    let headerClass = classnames(st.header_container, { [st.header__scrolled]: isWindowScrolled });
    
    return (
    <div className={headerClass} crust-apptheme={appTheme}>
        <Link to={'/'} key={'home'}>
            <div className={st.crust_logo} onClick={onEnterSetTheme}>thincrust</div>
        </Link>
        <div className={st.header_reveal_action}></div>
        {/** 
        <ul className={st.header_sections}>
            <Link to={'/politics/TrumpFirstYear'} key={'TrumpFirstYear'}>
                <li className={st.header_section_item} data-id="nav-trumpfirstyear">TrumpFirstYear</li>
            </Link>
            <Link to={'/politics/Inside2020/Democrats'} key={'Inside2020Democrats'}>
                <li className={st.header_section_item} data-id="nav-inside2020democrats">Inside2020</li>
            </Link>
        </ul>
        **/}
    </div>
    )
}

const mapStateToProps = state => ({
  appTheme: getCurrentBackgroundTheme(state.crustState),
});

export default connect(
  mapStateToProps
)(AppHeader);
