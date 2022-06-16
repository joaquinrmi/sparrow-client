import React from "react";
import NavigationItem from "./components/navigation_item";

import "./page_navigation.scss";

export interface Props
{
    items: Array<ItemDefinition>;
}

export interface ItemDefinition
{
    to: string;
    content: string;
}

const PageNavigation: React.FunctionComponent<Props> = (props) =>
{
    return <div className="page-navigation">
        <div className="items-wrapper">
            {props.items.map((item, index) =>
            {
                return <NavigationItem key={`${index}-item`} to={item.to}>{item.content}</NavigationItem>
            })}
        </div>
    </div>;
};

export default PageNavigation;