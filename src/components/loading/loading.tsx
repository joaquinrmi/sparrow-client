import React from "react";

import "./loading.scss";

export interface Props
{}

const BLUE = "#00ACF4";
const LIGHT_BLUE = "#D2EBFC";

const Loading: React.FunctionComponent<Props> = (props) =>
{
    return <svg className="loading" width="30" height="30">
        <circle cx="50%" cy="50%" r="12" strokeWidth="4" stroke={LIGHT_BLUE} fill="none"></circle>
        <circle className="animated-circle" cx="50%" cy="50%" r="12" strokeWidth="4" stroke={BLUE} fill="none"></circle>
    </svg>;
};

export default Loading;