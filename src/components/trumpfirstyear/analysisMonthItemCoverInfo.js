import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import st from '~/styles/politics/trump.css'

function AnalysisMonthItemCoverInfo (props) {
    return (
        <div className={st.cover_info}>
            <p className={st.month_title}>{props.header}</p>
            <ul className={st.month_tags}>
                {props.keytag.map((tag, tagi) => 
                    <li key={tagi}>#{tag}</li>
                )}
            </ul>
        </div>
    )
}

export default AnalysisMonthItemCoverInfo;