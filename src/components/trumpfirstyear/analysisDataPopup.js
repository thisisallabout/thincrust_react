import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import st from '~/styles/politics/trump.css'

function AnalysisDataPopup (props) {
    return (
        props.data.length == 0 ? (
            <div className={st.whattrumpsaid_datapopup}></div>
        ) : (
        <div className={`${st.whattrumpsaid_datapopup} ${st.opened}`}>
            <div className={st.datapopup_contents}>
            {props.data.map((tweets, i) => 
                <div className={st.item_tweets} key={tweets.ts}>
                    <div className={st.tweet_item} key={tweets.title + i}>
                        <p className={st.text}>{tweets.title}</p>
                        <p className={st.ts} doughdata-ts={tweets.ts}></p>
                    </div>
                </div>
            )}
            </div>
            <div className={st.datapopup_close_action} onClick={props.removeAllTweetsData}>
                <div className={st.icon}></div>
            </div>
        </div>
        )
    )
}

export default AnalysisDataPopup;