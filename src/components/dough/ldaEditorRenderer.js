import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Timestamp from 'react-timestamp';
import { values } from 'lodash';

import dcm from '~/styles/dough/common.css';

function LDAEditorRenderer (props) {
    const { data } = props;
    const [ldaData, setldaData] = useState([]);
    const [editedLDAdata, setEditedLDAdata] = useState({ data: [] });

    useEffect(() => {
        console.log(ldaData)
    }, [ldaData]);

    const editTopicTitle = (topickey, e) => {
        let newKey = 
            {   
                "topic_keywords": topickey[0].topic_keyword,
                "items": topickey,
                "topic_title": e.target.value
            }
        console.log(newKey)
        const newData = ldaData.push(newKey)
        setldaData(newData)
    }

    return (
        data == [] ? (
            <div className={dcm.dough_renderdata}></div>
        ) : (
        <div className={`${dcm.dough_renderdata} ${dcm.load}`} key="LDAeditor_renderer">
            {Object.keys(data).map((key, index) => 
                <div className={dcm.data_group} key={index} doughdata-dict={JSON.stringify(data[key])}>
                    <p className={dcm.datagroup_header}>{key}</p>
                    <div className={dcm.datagroup_content}>
                    {data[key].map((item) => 
                        <div className={dcm.data_item} key={item.id} doughdata-id={item.id} doughdata-dict={JSON.stringify(item)}>
                            <p className={dcm.item_text}>{item.tweet}</p>

                            <div className={dcm.item_metadata}>
                                <ul className={dcm.item_additionaltags}>
                                {item.tweet_hashtags.map((hashtag, hid) => 
                                    <li className={dcm.item_additionaltags} key={hid}>#{hashtag}</li>
                                )}
                                </ul>
                                <ul className={dcm.item_additionaltags}>
                                {item.tweet_mentions.map((mention, mid) => 
                                    <li className={dcm.item_additionaltags} key={mid}>@{mention}</li>
                                )}
                                </ul>
                                {item.link && (
                                    <a href={item.link} target="_blank"><p className={dcm.item_link}>{item.link}</p></a>
                                )}
                                <p className={dcm.item_timestamp}><Timestamp date={item.timestamp} /></p>
                                <p className={dcm.item_topiccontrib}>Contribution Percentage: {item.topic_contribution_percentage * 100}%</p>
                            </div>
                            
                        </div>
                    )}
                    </div>
                    <div className={dcm.datagroup_editor} doughdata-id={data[key][0].topic_keyword}>
                        <div className={dcm.datagroup_editor_item} doughdata-id={data[key][0].topic_keyword}>
                            <p>Topic title</p>
                            <input type="text" placeholder='Title' />
                        </div>

                        <div className={dcm.datagroup_editor_item} doughdata-id={data[key][0].topic_keyword}>
                            <p>Topic description</p>
                            <input type="text" placeholder="Description" />
                        </div>
                    </div>
                </div>
            )}
        </div>
        )
    )
}

export default LDAEditorRenderer;