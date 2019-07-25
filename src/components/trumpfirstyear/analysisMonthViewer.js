import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import VisibilitySensor from 'react-visibility-sensor';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, RedditShareButton, EmailShareButton } from 'react-share';
import { FacebookIcon, LinkedinIcon, TwitterIcon, RedditIcon, EmailIcon } from 'react-share';

import st from '~/styles/politics/trump.css'
import slidetransition from '~/styles/transitions/slideinout.css'
import AnalysisDynamicBg from '~/components/trumpfirstyear/analysisDynamicBg'
import AnalysisDataPopup from '~/components/trumpfirstyear/analysisDataPopup'

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
    const [allTweets, setAllTweets] = useState({ list: [] });

    useEffect(() => {
        //console.log(activeDynamicBg.item)
    }, [activeDynamicBg]);

    const getAllTweets = (id) => {
        props.data.data.map((item) => {
            if (item.id === id) {
                setAllTweets({ list: item.articles });
                return;
            }
        });
    }

    const removeAllTweetsData = () => {
        setAllTweets({ list: [] });
    }

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
                                <div className={st.item_revealtweets_action} onClick={() => getAllTweets(item.id)}>
                                    <p>MORE</p>
                                </div>
                                ) : (
                                <div className={`${st.item_revealtweets_action} ${st.nobg}`} onClick={() => getAllTweets(item.id)}>
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
                        </div>                
                )}
                </div>
            </div>
            
            <TransitionGroup component={null}>
                {allTweets.list !== [] && (
                <CSSTransition
                    timeout={300}
                    classNames={slidetransition}
                    unmountOnExit
                    appear>
                    <AnalysisDataPopup data={allTweets.list} removeAllTweetsData={() => { removeAllTweetsData() }} />
                </CSSTransition>
                )}
            </TransitionGroup>

            <div className={st.whattrumpsaid_analysis_data_panelactions}>
                <div className={st.whattrumpsaid_analysis_data_action_close} onClick={props.removeMonthlyData}>
                    <div className={st.icon}></div>
                    <p>Close</p>
                </div>
                <div className={st.whattrumpsaid_analysis_data_action_social}>
                    <FacebookShareButton
                        url={window.location.href}
                        quote="#TrumpFirstYear on thisisallabout">
                        <FacebookIcon
                        size={22}
                        round />
                    </FacebookShareButton>
                    <TwitterShareButton
                        url={window.location.href}
                        quote="#TrumpFirstYear on thisisallabout">
                        <TwitterIcon
                        size={22}
                        round />
                    </TwitterShareButton>
                    <LinkedinShareButton
                        url={window.location.href}
                        quote="#TrumpFirstYear on thisisallabout">
                        <LinkedinIcon
                        size={22}
                        round />
                    </LinkedinShareButton>
                    <RedditShareButton
                        url={window.location.href}
                        quote="#TrumpFirstYear on thisisallabout">
                        <RedditIcon
                        size={22}
                        round />
                    </RedditShareButton>
                    <EmailShareButton
                        url={window.location.href}
                        subject="#TrumpFirstYear on thisisallabout"
                        body="Hey, take a look at this analysis piece about President Trump's first year tweets! ">
                        <EmailIcon
                        size={22}
                        round />
                    </EmailShareButton>
                </div>

            </div>
        </div>
        )
    )
}

export default AnalysisMonthViewer;