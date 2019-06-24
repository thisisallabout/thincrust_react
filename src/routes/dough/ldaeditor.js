import React, { lazy, Suspense, Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';

import loader from '~/styles/transitions/loader.css';
import store from '~/store';
import { APP_BACKGROUND_THEME } from '~/constants/actionTypes';
import { getCurrentBackgroundTheme } from '~/selectors/appBackgroundTheme';

import dcm from '~/styles/dough/common.css';


const DoughLDAEditor = ({match, history, appTheme}) => {
    const [ldaData, setldaData] = useState({ data: 'Paste JSON strings here' });

    useEffect(() => {
        store.dispatch({ type: APP_BACKGROUND_THEME, state: { id: 'black' } })
    }, []);
    //https://raw.githubusercontent.com/toddoh/thincrust_politicians_tweets/master/output/warren/result_lda_top_warren-full.json?token=AAZJG2CXDWNCAJ2XZ2IE4RS5DJVK4

    const parseLDAdata = (e) => {
        setldaData({ data: e.target.value })
    }
    
    return (
        <div crust-apptheme={appTheme} style={ appTheme == 'black' ? {'backgroundColor': `#000`} : {'backgroundColor': `#fff`}}>
            <div className={dcm.dough_hero}>
                <p className={dcm.hero1}>LDA Topic Editor</p>
                <p className={dcm.hero2}>Provide a topic modeling result created using Dough to view and edit the result.</p>
            </div>
            <div className={dcm.dough_submitdata}>
                <textarea placeholder={ldaData.data}
                    onChange={parseLDAdata} />
            </div>

            <div className={dcm.dough_renderdata}>
                
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    appTheme: getCurrentBackgroundTheme(state.crustState),
  });
  
export default connect(
    mapStateToProps
)(DoughLDAEditor);
  