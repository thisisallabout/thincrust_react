import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";

import st from '~/styles/politics/trump.css'
import slidetransition from '~/styles/transitions/slideinout.css'

import loader from '~/styles/transitions/loader.css';
import AnalysisMonthViewer from '~/components/trumpfirstyear/analysisMonthViewer'
import AnalysisMonthItem from '~/components/trumpfirstyear/analysisMonthItem'

function TrumpFirstYear({ match, history }) {
    const { typeId } = match.params;

    const [data, setData] = useState({ list: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [monthlyData, setMonthlyData] = useState({ list: [] });
    const [isMonthlyLoading, setIsMonthlyLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await axios(
                'https://toddoh.com/thisisallabout/data_publish_ready/trumptweeted/list_data.json',
            );
            
            setData({list: result.data});
            setIsLoading(false);
        };

        fetchData();
        if (typeId) {
            fetchMonhtlyData(typeId)
        }
    }, []);

    const removeMonthlyData = async() => {
        await setMonthlyData({ list: [] })
        const origin = match.path.split('/:typeId')
        history.push(origin[0])
    }

    const fetchMonhtlyData = (month) => {
        console.log(month)
        setIsMonthlyLoading(true);
        const result = axios(
            'https://toddoh.com/thisisallabout/data_publish_ready/trumptweeted/' + month + '.json',
        ).then(async(response) => {
            await setMonthlyData({list: response.data[0]});
            history.push(match.url + '/' + month)
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
        <div>
            <div className={st.whattrumpsaid_hero}>
                <div className={st.whattrumpsaid_herotext}>
                    <p className={st.hero1}>Reading Trump's moves</p>
                    <p className={st.hero1}>through his tweets</p>
                    <p className={st.whattrumpsaid_action_details}>Details</p>
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

export default TrumpFirstYear;