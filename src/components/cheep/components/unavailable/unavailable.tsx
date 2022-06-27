import React from "react";

import "./unavailable.scss";

export interface Props
{
    quote?: boolean;
}

const Unavailable: React.FunctionComponent<Props> = (props) =>
{
    return <div className={`unavailable-cheep ${props.quote ? "quote" : ""}`}>
        Este cheep no está disponible.
    </div>;
};

export default Unavailable;