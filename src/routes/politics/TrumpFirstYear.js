import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import st from '~/routes/politics/trump.css'
import DatasetLoader from '~/components/datasetLoader'


function AnalysisMonthItem ({ list, month }) {

    return (
        <Fragment>
        {list.map((object, i) => 
            <Fragment key={object.month}>
                {object.month === month &&
                    <div className={st.whattrumpsaid_analysis_data_cover} key={i}>
                        {object.image && (
                            <div className={st.cover_image} key={object.image} style={{'backgroundImage': `linear-gradient(to bottom, rgba(0, 0, 0 , 0.4) 0%, rgba(0, 0, 0, 0.2) 100%), url(${object.image})`}}></div>
                            )
                        }
                        <div className={st.cover_info} key={'info_'+i}>
                            <p className={st.month_title} key={'month_title_'+i}>{object.header}</p>
                            <ul className={st.month_tags} key={'month_tags_'+i}>
                                {object.keytag.map((tag, tagi) => 
                                    <li key={tagi}>#{tag}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                }
            </Fragment>
        )}  
        </Fragment>
    )
}

function TrumpFirstYear({ match }) {
    const [data, setData] = useState({ list: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://toddoh.com/thisisallabout/data_publish_ready/trumptweeted/list_data.json',
            );
            
            setData({list: result.data});
        };

        fetchData();
    }, []);


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

            <div className={st.whattrumpsaid_section_monthly}>
                <div className={st.whattrumpsaid_analysis_group}>
                    {analysis_month_index_natural.map((item, i) =>
                        <div className={st.whattrumpsaid_analysis_data} key={analysis_month_index_natural[i]} doughdata-month={analysis_month_index_natural[i]}>
                            <AnalysisMonthItem list={data.list} month={analysis_month_index_natural[i]} />    
                        </div>
                    )}
                </div>
            </div>
            <div className={st.whattrumpsaid_analysis_data_wrapper}></div>
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