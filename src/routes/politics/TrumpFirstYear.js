import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Helmet } from "react-helmet";

import store from '~/store';
import AppHeader from '~/components/appHeader';
import { APP_BACKGROUND_THEME } from '~/constants/actionTypes';
import { getCurrentBackgroundTheme } from '~/selectors/appBackgroundTheme';

import st from '~/styles/politics/trump.css'
import slidetransition from '~/styles/transitions/slideinout.css'

import loader from '~/styles/transitions/loader.css';
import AnalysisMonthViewer from '~/components/trumpfirstyear/analysisMonthViewer'
import AnalysisMonthItem from '~/components/trumpfirstyear/analysisMonthItem'

function TrumpFirstYear({match, history, appTheme}) {
    const { typeId } = match.params;

    const [data, setData] = useState({ list: [] });
    const [isInit, setIsInit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [monthlyData, setMonthlyData] = useState({ list: [] });
    const [isMonthlyLoading, setIsMonthlyLoading] = useState(false);


    useEffect(() => {
        document.title = "#TrumpFirstYear - thisisallabout";

        const fetchData = async () => {
            setIsLoading(true);
            const result = await axios(
                'https://thisisallabout.com/dataset/trumptweeted/list_data.json',
            );
            
            setData({list: result.data});
            setIsLoading(false);
        };

        fetchData();
        if (typeId) {
            fetchMonhtlyData(typeId)
        }

        store.dispatch({ type: APP_BACKGROUND_THEME, state: { id:'black' } })
        setIsInit(true)
    }, []);

    

    useEffect(() => {
        if (!isInit) return;
        if (!typeId) {
            removeMonthlyData();
        } else {
            if (monthlyData.list == []) fetchMonhtlyData(typeId)
        }
    }, [typeId]);

    const removeMonthlyData = async() => {
        await setMonthlyData({ list: [] })
        if (location.pathname == '/politics/TrumpFirstYear') return;
        history.push({
            pathname: '/politics/TrumpFirstYear'
        })
    }

    const fetchMonhtlyData = (month) => {
        setIsMonthlyLoading(true);
        const result = axios(
            'https://thisisallabout.com/dataset/trumptweeted/' + month + '.json',
        ).then(async(response) => {
            await setMonthlyData({list: response.data[0]});
            history.push(`/politics/TrumpFirstYear/${month}`)
        })
        .catch(error => {
            console.log(error);
        }).then(() => {
            setIsMonthlyLoading(false);
        });
    };


    const analysis_month_index = [
        {
            "year": "2017",
            "months": ["2017-01", "2017-02", "2017-03", "2017-04", "2017-05", "2017-06", "2017-07", "2017-08", "2017-09", "2017-10", "2017-11", "2017-12"],
            "months_string": ["jan2017", "feb2017", "mar2017", "apr2017", "may2017", "jun2017", "jul2017", "aug2017", "sep2017", "oct2017", "nov2017", "dec2017"]
        },
        {
            "year": "2018",
            "months": ["2018-01"],
            "months_string": ["jan2018"]
        }
    ];

    const analysis_month_index_natural = [
        "2017-01", "2017-02", "2017-03", "2017-04", "2017-05", "2017-06", "2017-07", "2017-08", "2017-09", "2017-10", "2017-11", "2017-12", "2018-01"
    ].reverse();
    

    return (
        <div crust-apptheme={appTheme} style={ appTheme == 'black' ? {'backgroundColor': `#000`} : {'backgroundColor': `#fff`}}>
            <Helmet>
                <html lang="en" amp />
                <base target="_blank" href="https://thisisallabout.com/" />
                <title>#TrumpFirstYear - thisisallabout</title>
                <meta name="description" content="We all know that President Trump loves posting on Twitter. And that means you can see through his fanciful game by tweets. Here's an analysis of his first year tweets since day one." />
                <meta name="keywords" cpntent="trump,president,donald,donald trump,tweet,trumpfirstyear,whattrumpsaid,thisisallabout,first year,whitehouse,twitter" />
                <meta property="og:type" content="article" />
            </Helmet>
            
            <AppHeader />
            <div className={st.whattrumpsaid_hero}>
                <Link to={'/'} key={'home'}>
                    <div className={st.crust_logo}></div>
                </Link>
                <div className={st.whattrumpsaid_herotext}>
                    <p className={st.hero1}>Reading Trump's moves</p>
                    <p className={st.hero1}>through his tweets</p>
                    <p className={st.hero2}>We all know that President Trump loves posting on Twitter. And that means you can see through his fanciful game by tweets. Here's an analysis of his first year tweets since day one.</p>
                    <p className={st.hero3}>Last updated on June 24, 2018</p>
                </div>
            </div>
            {isLoading && (
                <div className={`${loader.crust__loader} ${loader.dataset}`}></div>
            ) }
            {isMonthlyLoading && (
                <div className={`${loader.crust__loader} ${loader.dataset}`}></div>
            ) }

            <div className={st.whattrumpsaid_section_monthly}>
                <div className={st.whattrumpsaid_analysis_group} >
                    {analysis_month_index_natural.map((item, i) =>
                        <div className={st.whattrumpsaid_analysis_data} key={analysis_month_index_natural[i]} doughdata-month={analysis_month_index_natural[i]}>
                            <AnalysisMonthItem list={data.list} month={analysis_month_index_natural[i]} onClick={() => { fetchMonhtlyData(analysis_month_index_natural[i]) }} />    
                        </div>
                    )}
                </div>
            </div>
            
            <TransitionGroup component={null}>
                {monthlyData.list.data && (
                <CSSTransition
                    timeout={300}
                    classNames={slidetransition}
                    unmountOnExit
                    appear>
                    <AnalysisMonthViewer data={monthlyData.list} removeMonthlyData={() => { removeMonthlyData() }} />
                </CSSTransition>
                )}
            </TransitionGroup>
            

            <div className={st.whattrumpsaid_datapopup}>
                <div className={st.datapopup_contents}>
                </div>
                <div className={st.datapopup_close_action}>
                    <div className={st.icon}></div>
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
)(TrumpFirstYear);
  