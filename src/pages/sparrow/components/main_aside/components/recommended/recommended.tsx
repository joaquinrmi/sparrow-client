import React from "react";
import { Link } from "react-router-dom";
import UserList, { UserListType } from "../../../user_list";
import AsideSection from "../aside_section";

import "./recommended.scss";

export interface Props
{}

const Recommended: React.FunctionComponent<Props> = (props) =>
{
    return <AsideSection title="Quizás te guste" className="aside-recommended">
        <UserList id="aside-recommended" name="asideRecommended" type={UserListType.Recommended} target={0} limit={3} little />

        <Link to="/recommended" className="show-more">
            Mostrar más
        </Link>
    </AsideSection>;
};

export default Recommended;