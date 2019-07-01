import React, { lazy, Suspense, Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import { groupBy, filter, uniqueId } from 'lodash';

import loader from '~/styles/transitions/loader.css';
import store from '~/store';
import { APP_BACKGROUND_THEME } from '~/constants/actionTypes';
import { getCurrentBackgroundTheme } from '~/selectors/appBackgroundTheme';

import dcm from '~/styles/dough/common.css';
import LDAEditorRenderer from '~/components/dough/ldaEditorRenderer.js'


const DoughLDAEditor = ({ match, history, appTheme }) => {
    const [ldaData, setldaData] = useState({ data: [] });
    const [ldaDataName, setldaDataName] = useState('');

    useEffect(() => {
        store.dispatch({ type: APP_BACKGROUND_THEME, state: { id: 'black' } })
    }, []);

    const getCurrentDate = (separator = '') => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `_${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}_`
    }

    const generateJSON = (data) => {
        const fileData = JSON.stringify(data);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.download = ldaDataName + getCurrentDate() + '.json';
        link.href = url;
        link.click();
    }

    const parseLDAdata = (e) => {
        const groupByTopic = groupBy(JSON.parse(e.target.value), item => item.topic_keyword);
        const reformatted = [];
        filter(Object.keys(groupByTopic), (item) => {
            reformatted.push({
                "id": uniqueId(ldaDataName + '_'),
                "topic_keywords": item.split(','),
                "items": groupByTopic[item]
            })
        })

        setldaData({ data: reformatted })
        generateJSON(reformatted)
    }

    const saveModelName = (e) => {
        setldaDataName(e.target.value)
    }

    return (
        <div crust-apptheme={appTheme} style={appTheme == 'black' ? { 'backgroundColor': `#000` } : { 'backgroundColor': `#fff` }}>
            <div className={dcm.dough_hero}>
                <p className={dcm.hero1}>LDA Topic Viewer</p>
                <p className={dcm.hero2}>Provide a topic modeling result created using Dough to view or edit the result.</p>
            </div>
            <div className={dcm.dough_submitdata}>
                <p className={dcm.hero2}>Model name</p>
                <input type="text" placeholder='Model' onChange={(e) => saveModelName(e)} />
                <p className={dcm.hero2}>Model dataset</p>
                <textarea placeholder={ldaData.data}
                    onChange={parseLDAdata} />
            </div>

            <LDAEditorRenderer data={ldaData.data} />
        </div>
    )
}

const mapStateToProps = state => ({
    appTheme: getCurrentBackgroundTheme(state.crustState),
});

export default connect(
    mapStateToProps
)(DoughLDAEditor);
