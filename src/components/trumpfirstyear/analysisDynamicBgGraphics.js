import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import st from '~/styles/politics/trump.css'

const AnalysisDynamicBgGraphics = (props) => {
    const { type } = props;

    if (props.type == '1701c03') {
        return (
        <div className={st.graphic}>
            <div className={st.graphic_box}>
                <p>😈</p>
                <p>EVIL AND FAKE</p>
                <p>CNN?</p>
            </div>
            <div className={st.graphic_box}>
                <p>😇</p>
                <p>GREAT AND NO.1</p>
                <p>Fox News?</p>
            </div>
        </div>
        )
    }

    if (props.type == '1701c04') {
        return (
        <div className={st.graphic}>
            <div className={st.graphic_box}>
                <p>🤬</p>
                <p>THE COVERAGE ABOUT ME IN</p>
                <p>NYT AND WP HAS BEEN SO FALSE! ...</p>
            </div>
            <div className={st.graphic_box}>
                <p>😤</p>
            </div>
        </div>
        )
    }

    if (props.type == '1701c05') {
        return (
        <div className={st.graphic}>
            <div className={st.graphic_box}>
                <p>EXTREME</p>
            </div>
        </div>
        )
    }

    if (props.type == '1702c02') {
        return (
        <div className={st.graphic}>
            <div className={`${st.graphic_box} ${st.nyt}`}>
                <div className={st.nytlogo}></div>
                <p>FAKE</p>
            </div>
            <div className={`${st.graphic_box} ${st.cnn}`}>
                <div className={st.cnnlogo}></div>
                <p>FAKE</p>
            </div>
        </div>
        )
    }

    if (props.type == '1703c00') {
        return (
        <div className={st.graphic}>
            <div className={st.graphic_box}>
                <div className={st.trumpcare}></div>
                <p>😏</p>
            </div>
        </div>
        )
    }

    if (props.type == '1703c01') {
        return (
        <div className={st.graphic}>
            <div className={st.graphic_box}>
                <p>MORE JOBS</p>
            </div>
        </div>
        )
    }
    
    if (props.type == '1704c01') {
        return (
        <div className={st.graphic}>
        </div>
        )
    }
    
    if (props.type == '1706c05') {
        return (
        <div className={st.graphic}>
        </div>
        )
    }
    
    if (props.type == '1707c01' || type == '1707c03' || type == '1707c03' || type == '1707c04') {
        return (
        <div className={st.graphic}>
        </div>
        )
    }
    
    if (props.type == '1708c05') {
        return (
        <div className={st.graphic}>
        </div>
        )
    }
    
    if (props.type == '1709c03') {
        return (
        <div className={st.graphic}>
        </div>
        )
    }
    
    if (props.type == '1711c01' || type == '1711c05') {
        return (
        <div className={st.graphic}>
        </div>
        )
    }
    
    if (props.type == '1712c00' || type == '1712c02') {
        return (
        <div className={st.graphic}>
        </div>
        )
    }
    
    if (props.type == '1801c00') {
        return (
        <div className={st.graphic}>
        </div>
        )
    }

    return (
        <div></div>
    )
}

export default AnalysisDynamicBgGraphics;