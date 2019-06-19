import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import st from '~/styles/politics/trump.css'

function AnalysisDynamicBg (props) {
    return (
        <div className={st.whattrumpsaid_analysis_data_dynamicbg} doughdata-month={props.month} key={props.month}>
            <div className={st.dynamicbg_group} doughdata-month={props.month}>
                {props.data.map((item) =>
                    <div className={st.dynamicbg_item} doughdata-id={item.id} key={item.id}>
                        {item.image && (
                            <div className={st.image} style={{ 'backgroundImage': `linear-gradient(to bottom, rgba(0, 0, 0 , 0.4) 0%, rgba(0, 0, 0, 0.2) 100%), url(${item.image})` }}></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AnalysisDynamicBg;