import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import VisibilitySensor from 'react-visibility-sensor';

import st from '~/styles/politics/trump.css'
import AnalysisDynamicBg from '~/components/trumpfirstyear/analysisDynamicBg'

function AnalysisItem (props) {
    const { item, visible, activateDynamicBg } = props;
    const [activeDynamicItem, setActiveDynamicItem] = useState({ item: '' });

    if (props.visible == true) {
        if (activeDynamicItem.item !== props.item.id) {
            const dynamicBgPass = async() => {
                await setActiveDynamicItem({item: props.item.id})
                props.activateDynamicBg()
            }
            dynamicBgPass();
        }
    } else {
        if (activeDynamicItem.item == props.item.id) {
            const dynamicBgPass = async() => {
                await setActiveDynamicItem({item: []})
                props.activateDynamicBg()
            }
            dynamicBgPass();
        }
    }

    return (
        <div className={st.item_title}>
            <p className={st.title_text}>{props.item.header}</p>
            {props.item.msg && (
            <p className={st.msg_text}>{props.item.msg}</p>
            )}
            {props.item.imgcopyright && (
            <div className={st.item_img_copyright}>
                <p>{props.item.imgcopyright}</p>
            </div>
            )}
        </div>
    )
}

function AnalysisMonthViewer (props) {
    const { data, month } = props;
    const [activeDynamicBg, setActiveDynamicBg] = useState({ item: [] });

    useEffect(() => {
        //console.log(activeDynamicBg.item)
    }, [activeDynamicBg]);

    return (
        data.data == undefined ? (
            <div className={st.whattrumpsaid_analysis_data_wrapper}></div>
        ) : (
        <div className={`${st.whattrumpsaid_analysis_data_wrapper} ${st.load}`} key={props.data.month}>
            <AnalysisDynamicBg month={props.data.month} data={props.data.data} active={activeDynamicBg.item} />

            <div className={st.analysis_group} doughdata-month={props.data.month}>
                <div className={st.analysis_list}>
                {props.data.data.map((item) => 
                        <div className={st.analysis_item} doughdata-id={item.id} key={item.id}>
                            <VisibilitySensor key={item.id} intervalCheck scrollCheck> 
                            {({isVisible}) =>
                                <AnalysisItem item={item} key={item.id} visible={isVisible ? true : false} activateDynamicBg={() => setActiveDynamicBg({item: item.id})}/>
                            }
                            </VisibilitySensor>
                            {item.picked ? (
                            <div className={st.item_pickedtweets}>
                                <div className={st.tweet_item}>
                                    <p className={st.tweet_text}>“{item.picked[0].title}”</p>
                                    {item.picked[0].url && (<p className={st.link_text}>{item.picked[0].url}</p>)}
                                </div>
                                {item.image ? (
                                <div className={st.item_revealtweets_action}>
                                    <p>MORE</p>
                                </div>
                                ) : (
                                <div className={`${st.item_revealtweets_action} ${st.nobg}`}>
                                    <p>MORE</p>
                                </div>
                                )}
                            </div>
                            ) : (
                                <Fragment>
                                {item.image ? (
                                <div className={`${st.item_revealtweets_action} ${st.notweet}`}>
                                    <p>MORE</p>
                                </div>
                                ) : (
                                <div className={`${st.item_revealtweets_action} ${st.nobg} ${st.notweet}`}>
                                    <p>MORE</p>
                                </div>
                                )}
                                </Fragment>
                            )
                            }
                            
                            
                            <div className={st.item_tweets}>
                            {item.articles.map((tweets,i) => 
                                <div className={st.tweet_item} key={tweets.title + i}>
                                    <p className={st.text}>{tweets.title}</p>
                                    <p className={st.ts} doughdata-ts={tweets.title + i}></p>
                                </div>
                            )}
                            </div>
                        </div>                
                )}
                </div>
            </div>

            <div className={st.whattrumpsaid_analysis_data_panelactions}>
                <div className={st.whattrumpsaid_analysis_data_action_close} onClick={props.removeMonthlyData}>
                    <div className={st.icon}></div>
                    <p>Close</p>
                </div>
            </div>
        </div>
        )
    )
}

export default AnalysisMonthViewer;