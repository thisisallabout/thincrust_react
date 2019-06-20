import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import st from '~/styles/politics/trump.css'
import fadetransition from '~/styles/transitions/fadeinout.css'
import AnalysisDynamicBgGraphics from '~/components/trumpfirstyear/AnalysisDynamicBgGraphics'

function AnalysisDynamicBg (props) {
    const { month, data, active } = props;
    
    const isActive = (id) => {
        return id == props.active;
    }

    return (
        <div className={st.whattrumpsaid_analysis_data_dynamicbg} doughdata-month={props.month} key={props.month}>
            <div className={st.dynamicbg_group} doughdata-month={props.month}>
                {props.data.map((item) => 
                <Fragment key={item.id}>
                    <TransitionGroup component={null}>
                        <CSSTransition
                            classNames={fadetransition}
                            timeout={300}>
                            {isActive(item.id) ? (
                                    <div className={`${st.dynamicbg_item} ${st.current}`} doughdata-id={item.id} key={item.id} >
                                        {item.image && (
                                            <div className={st.image} style={{ 'backgroundImage': `linear-gradient(to bottom, rgba(0, 0, 0 , 0.4) 0%, rgba(0, 0, 0, 0.2) 100%), url(${item.image})` }}></div>
                                        )}
                                        <AnalysisDynamicBgGraphics type={item.id} />
                                    </div>
                            ) : (
                                <div className={st.dynamicbg_item} doughdata-id={item.id} key={item.id} >
                                    {item.image && (
                                        <div className={st.image} style={{ 'backgroundImage': `linear-gradient(to bottom, rgba(0, 0, 0 , 0.4) 0%, rgba(0, 0, 0, 0.2) 100%), url(${item.image})` }}></div>
                                    )}
                                    <AnalysisDynamicBgGraphics type={item.id} />
                                </div>
                            )}
                        </CSSTransition>
                    </TransitionGroup>
                    
                </Fragment>
                )}
            </div>
            
        </div>
    )
}

export default AnalysisDynamicBg;