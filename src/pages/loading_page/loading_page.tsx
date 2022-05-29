import React from "react";
import Loading from "../../components/loading";

import "./loading_page.scss";

const LoadingPage: React.FunctionComponent = () =>
{
    return <div className="loading-page">
        <Loading />
    </div>;
};

export default LoadingPage;