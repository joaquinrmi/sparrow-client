import React, { useContext } from "react";
import PageHeader from "../../../../../../components/page_header";
import StateContext from "../../../../state_context";
import PageNavigation from "../../../page_navigation";
import Router from "../../../../../../components/router";
import UserList, { UserListType } from "../../../user_list";
import { Route, Routes } from "react-router-dom";
import RouteSetter from "../../../../../../components/route_setter";

import "./relations.scss";

export interface Props
{
    name: string;
    handle: string;
}

const Relations: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    return <div className="relations">
        <PageHeader>
            <div className="relations-user-title">
                <span className="name">
                    {props.name}
                </span>

                <span className="handle">
                    {props.handle}
                </span>
            </div>
        </PageHeader>

        <PageNavigation items={[
            {
                to: `${props.handle}/followers`,
                content: "Seguidores"
            },
            {
                to: `${props.handle}/following`,
                content: "Siguiendo"
            }
        ]} />

        <Router currentRoute={state.location.relations.currentRoute} routes={{
            following: <UserList id="following-user-list" name="following" type={UserListType.Following} target={props.handle} />,

            followers: <UserList id="follower-user-list" name="followers" type={UserListType.Followers} target={props.handle} />
        }} />

        <Routes>
            <Route path={`/:userHandle/following`} element={<RouteSetter id="following-relations" onMatch={() =>
            {
                stateManager.navigate("relations", "following");
            }} />} />

            <Route path={`/:userHandle/followers`} element={<RouteSetter id="followers-relations" onMatch={() =>
            {
                stateManager.navigate("relations", "followers");
            }} />} />
        </Routes>
    </div>;
};

export default Relations;