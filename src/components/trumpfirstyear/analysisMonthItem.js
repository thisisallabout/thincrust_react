import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import st from '~/styles/politics/trump.css'
import AnalysisMonthItemCoverInfo from '~/components/trumpfirstyear/analysisMonthItemCoverInfo'

function AnalysisMonthItem (props) {
    return (
        <div onClick={props.onClick}>
        {props.list.map((object, i) => 
            <Fragment key={object.month}>
                {object.month === props.month &&
                    <div>
                    <div className={st.whattrumpsaid_analysis_data_cover} key={i}>
                        {object.image && (
                            <div className={st.cover_image} key={object.image} style={{'backgroundImage': `linear-gradient(to bottom, rgba(0, 0, 0 , 0.4) 0%, rgba(0, 0, 0, 0.2) 100%), url(${object.image})`}}></div>
                            )
                        }

                        <AnalysisMonthItemCoverInfo keytag={object.keytag} header={object.header} />
                    </div>
                    
                    </div>
                }
            </Fragment>
        )}  
        </div>
    )
}

export default AnalysisMonthItem;