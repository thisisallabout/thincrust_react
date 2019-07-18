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

import ab from '~/styles/about.css'
import slidetransition from '~/styles/transitions/slideinout.css'
import loader from '~/styles/transitions/loader.css';

const About = (appTheme) => {

    useEffect(() => {
        store.dispatch({ type: APP_BACKGROUND_THEME, state: { id: 'white' } });
    }, []);

    return (
        <div crust-apptheme={appTheme} style={appTheme == 'black' ? { 'backgroundColor': `#000` } : { 'backgroundColor': `#fff` }} >
            <AppHeader />
            <div className={ab.abouttiaa_hero}>
                <div className={ab.crust_logo}></div>
                <div className={ab.abouttiaa_herotext}>
                    <p className={ab.hero1}>It's all about</p>
                    <p className={ab.hero1}>what really matters.</p>
                    <div className={ab.hero2}>
                        <p>At THISISALLABOUT, our aim is to unravel complex issues and agendas by group, timeframe, and key topic using intelligent data analysis and great visualization. With an eye towards curation, we help you navigate through a wide range of issues with a single click.</p>
                        <p>We are living in a time of unprecedented economic, political, and social hardships. That's why having a data driven perspective on key issues has become more critical than ever.</p>
                        <p>However, in the era of digital journalism, it's difficult to get clear information about what is affecting our daily lives. In a flood of stories and fake news, our aim is to help people understand issues in an easy, and clear way.</p>
                        <p>Our algorithm, without political bias, examines a wide range of media in order to create a qualified look at important issues. Through a deliberate process of data analysis and story curation, we will never stop exploring influential aspects of society.</p>
                        <p>THISISALLABOUT is a step forward in uncovering truth buried by bias.</p>
                    </div>
                </div>
            </div>

            <div className={ab.abouttiaa_team}>
                <p className={ab.title_text}>Team</p>
                <ul>
                    <li className={ab.team_member}>
                        <p className={ab.member_title}>Data Visualization Engineer: Todd Oh</p>
                        <div className={ab.member_desc}>
                            <p>He has worked on a number of projects over the years connected with news aggregation algorithms, geolocation, and mobile services.</p>
                            <p>Todd became involved with technology startups at an early age. At 17 he gave a TED talk at TEDxYouth Seoul, and has since gone on to major in sociology at Yonsei University.</p>
                            <p>And now his goal is to help people get access to the right information to debate aspects of their society. Bilingual in English and Korean, outside of the tech world he’s still trying to master homemade pasta. </p>
                        </div>
                        <div className={ab.social_channels}>
                            <a href="https://twitter.com/_toddoh" target="_blank"><div className={`${ab.team_social} ${ab.twitter}`}></div></a>
                            <a href="mailto:toddstonefieldoh@gmail.com" target="_blank"><div className={`${ab.team_social} ${ab.email}`}></div></a>
                        </div>
                    </li>
                    <li className={ab.team_member}>
                        <p className={ab.member_title}>Editor: Trevor Stonefield</p>
                        <div className={ab.member_desc}>
                            <p>With a degree in communications from Boston University, his previous work includes positions at traditional media companies like Time Inc. and Meredith Corporation, as well as helping to produce documentary films that emphasized social change and justice.</p>
                            <p>An American-Brit, he still hasn’t worked out the right way to pronounce “data.”</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    appTheme: getCurrentBackgroundTheme(state.crustState),
});

export default connect(
    mapStateToProps
)(About);
