import React, { Fragment, lazy, Suspense, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";

import store from '~/store';
import AppHeader from '~/components/appHeader';
import { APP_BACKGROUND_THEME } from '~/constants/actionTypes';
import { getCurrentBackgroundTheme } from '~/selectors/appBackgroundTheme';

import st from '~/styles/politics/trumpacross.css'
import slidetransition from '~/styles/transitions/slideinout.css'
import loader from '~/styles/transitions/loader.css';

function TrumpAcrossTime({ match, history, appTheme }) {
    const { typeId } = match.params;
    const tatcontainer = useRef(null);
    
    const [data, setData] = useState({ list: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [monthlyData, setMonthlyData] = useState({ list: [] });
    const [isMonthlyLoading, setIsMonthlyLoading] = useState(false);


    useEffect(() => {
        store.dispatch({ type: APP_BACKGROUND_THEME, state: { id: 'white' } });
        window.addEventListener('wheel', function (event) {
            if (event.deltaY != 0) {
                // manually scroll horizonally instead
                tatcontainer.current.scrollLeft += event.deltaY;
                event.preventDefault();
            }
        }, {passive: false});
    }, []);

    useEffect(() => {
        if (!typeId) {
            //removeMonthlyData();
        }
    }, [typeId]);

    return (
        <div crust-apptheme={appTheme} style={appTheme == 'black' ? { 'backgroundColor': `#000` } : { 'backgroundColor': `#fff` }} crust-sectionid="trumpacrosstime">
            <AppHeader />
            <div className={st.trumpacrosstime_container} ref={tatcontainer}>
                <div className={st.trumpacrosstime_hero}>
                    <div className={st.crust_logo}></div>
                    <div className={st.trumpacrosstime_herotext}>
                        <p className={st.hero1}>"Trumpism"</p>
                        <p className={st.hero1}>that redefined political landscape</p>
                        <p className={st.hero2}>President Trump's governance is radically different than traditional manner. And that redefined political landscape of the nation. This in-depth highlights what constructs "Trumpism".</p>
                        <p className={st.hero3}>Last updated on July 19, 2018. Editor: Trevor Stonefield, Data Analyst: "Todd" Seungyun Oh</p>
                    </div>
                </div>
                {isLoading && (
                    <div className={`${loader.crust__loader} ${loader.dataset}`}></div>
                )}
                {isMonthlyLoading && (
                    <div className={`${loader.crust__loader} ${loader.dataset}`}></div>
                )}

                <div className={st.trumpacrosstime_contents}>
                    
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    appTheme: getCurrentBackgroundTheme(state.crustState),
});

export default connect(
    mapStateToProps
)(TrumpAcrossTime);
