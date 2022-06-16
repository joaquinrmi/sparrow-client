import React from "react";
import { Link } from "react-router-dom";
import { useMatch, useResolvedPath } from "react-router-dom";

export interface NavigationItemProps
{
    children?: React.ReactNode;
    to: string;
}

const NavigationItem: React.FunctionComponent<NavigationItemProps> = (props) =>
{
    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return <div className="page-navigation-item">
        <Link to={props.to} className={`nav-button ${match ? "active" : ""}`}>
            <span className="nav-text">
                {props.children}
                
                <div className="color-bar"></div>
            </span>
        </Link>
    </div>;
};

export default NavigationItem;