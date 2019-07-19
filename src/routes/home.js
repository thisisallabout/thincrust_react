import React, { lazy, Suspense, Fragment } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'

import hm from "~/styles/home.css";

const Home = () => {

    return (
        <div className={hm.crust_home}>
            <div className={hm.crust_header}>
                <div className={hm.crust_logo}>thisisallabout</div>
                <p>thisisallabout</p>
            </div>

            <div className={hm.hero_group}>
                <div className={hm.hero_item_group}>
                    <div className={hm.hero_item} doughdata-id="trumpfirstyear">
                        <div className={hm.box_images}>
                            <div className={hm.img1}></div>
                        </div>

                        <Link to={'/politics/TrumpFirstYear'} key={'TrumpFirstYear'}>
                        <div className={hm.box_caption}>
                            <p className={hm.hero1}>Discover how President Trump changed the country in a year</p>
                            <p className={hm.hero2}>Walk-through of his own tweets since day one.</p>
                        </div>
                        </Link>
                    </div>

                    <div className={hm.hero_item} doughdata-id="trumpacrosstime">
                        <div className={hm.box_images}>
                            <div className={hm.img1}></div>
                        </div>
                        
                        <Link to={'/politics/TrumpAcrossTime'} key={'TrumpAcrossTime'}>
                        <div className={hm.box_caption}>
                            <p className={hm.hero1}>"Trumpism"</p>
                            <p className={hm.hero1}>redefines</p>
                            <p className={hm.hero1}>nation's political landscape</p>
                            <p className={hm.hero2}>A look into a newly-rising ideological group</p>
                        </div>
                        </Link>
                    </div>
                </div>

                {/** <Link to={'/politics/Inside2020/Democrats'} key={'Inside2020Democrats'}>**/}
                <div className={hm.hero_item} doughdata-id="inside2020_democrats">
                    <div className={hm.box_images}>
                        <div className={hm.img1}></div>
                        <div className={hm.img2}></div>
                        <div className={hm.img3}></div>
                        <div className={hm.img4}></div>
                        <div className={hm.img5}></div>
                    </div>

                    <div className={hm.box_caption}>
                        <p className={hm.hero1}>These Democratic</p>
                        <p className={hm.hero1}>candidates are aiming to</p>
                        <p className={hm.hero1}>"reshape" the nation</p>
                    </div>

                    <div className={hm.box_category}>
                        <p>Coming August 2019</p>
                    </div>
                </div>
                {/**</Link>**/}
            </div>

            <div className={hm.hero_subsection}>
                {/** 
                <div className={hm.subsection_item}>
                    <p className={hm.item_title}>Behind the scenes</p>
                    <ul>
                        <Link to={'/article/alg-trumpfirstyr'} key={'article-bhs_alg-trumpfirstyr'}>
                            <li>
                                The Algorith Behind <span className={hm.section_name}>/TrumpFirstYear</span>
                            </li>
                        </Link>
                        <Link to={'/article/inside2020-dem'} key={'article-bhs_inside2020-dem'}>
                            <li>
                                Why is it important to know their own past words? <span className={hm.section_name}>/Inside2020</span>
                            </li>
                        </Link>
                    </ul>
                </div>
                */}

                <div className={hm.subsection_item}>
                    <p className={hm.item_title}>Open-sourced work</p>
                    <ul>
                        <a href='https://github.com/toddoh/thisisallabout_backend/tree/master/kevin/processes/monthly' target='_blank'>
                            <li>
                                <span className={hm.section_name}>/TrumpFirstYear</span> Clustering
                            </li>
                        </a>
                        <a href='https://github.com/toddoh/thincrust_politicians_tweets' target='_blank'>
                            <li>
                                <span className={hm.section_name}>/Inside2020</span> Dataset (Democrats)
                            </li>
                        </a>
                    </ul>
                </div>
            </div>

            <div className={hm.crust_footer}>
                <ul>
                    <li>© 2019 thisisallabout.</li>
                    <Link to={'/about'} key={'about'}>
                        <li>about</li>
                    </Link>
                    <a href='mailto:thisisallabout.master@gmail.com'>
                        <li>contact</li>
                    </a>
                </ul>
            </div>
        </div>
    )
}

export default Home;