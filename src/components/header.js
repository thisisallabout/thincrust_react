import React, { useState, Fragment } from "react";
import st from "./app.css";

function headerComponent(props) {
    const [name, setState] = useState("anshul");
    const handleCahnge = e => setState(e.target.value);

    const contentSections = [
        { id: 'nav-section-today', name: 'Today', path: '' },
        { id: 'nav-section-trump2017', name: 'Trump2017', path: 'trump/2017' }
    ];

    return (
        <Fragment>
            <div className={st.crust__header}>
                <div className={st.header_container}>
                    <div className={st.crust_logo}>thincrust</div>
                    <ul className={st.header_sections}>
                    {contentSections.map((c, i) => (
                        <a href="{c.path}" key={i}><li className={st.header_section_item} data-id={c.id}>{c.name}</li></a>
                    ))}
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}

export default headerComponent;