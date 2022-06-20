import React, { useContext } from "react";
import Button, { ButtonStyle } from "../../../../components/button";
import followUser from "../../follow_user";
import StateContext from "../../state_context";
import unfollowUser from "../../unfollow_user";

import "./follow_button.scss";

export interface Props
{
    id: string;
    following: boolean;
    userHandle: string;

    onFollow(): void;
    onUnfollow(): void;
}

const FollowButton: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    let content: React.ReactNode;
    if(props.following)
    {
        content = <Button
            id={props.id}
            stylePreset={ButtonStyle.White}
            className="follow-button"
            onClick={(ev) =>
            {
                ev.stopPropagation();

                stateManager.openUnfollowConfirmation(props.userHandle, async () =>
                {
                    props.onUnfollow();
                    stateManager.closeUnfollowConfirmation();

                    const unfollowing = await unfollowUser(props.userHandle);
                    if(!unfollowing)
                    {
                        props.onFollow();
                    }
                });
            }}
            onMouseEnter={() =>
            {
                const button = document.getElementById(props.id) as HTMLButtonElement;
                if(button === null)
                {
                    return;
                }

                button.classList.remove(ButtonStyle.White);
                button.classList.add(ButtonStyle.LightRed);
            }}
            onMouseLeave={() =>
            {
                const button = document.getElementById(props.id) as HTMLButtonElement;
                if(button === null)
                {
                    return;
                }

                button.classList.remove(ButtonStyle.LightRed);
                button.classList.add(ButtonStyle.White);
            }}
        >
            <span className="following-message">Siguiendo</span>
            <span className="unfollow-message">Dejar de seguir</span>
        </Button>;
    }
    else
    {
        content = <Button id={props.id} stylePreset={ButtonStyle.Black} onClick={(ev) =>
        {
            ev.stopPropagation();

            props.onFollow();

            (async () =>
            {
                const following = await followUser(props.userHandle);
                if(!following)
                {
                    props.onUnfollow();
                }
            })();
        }}>
            Seguir
        </Button>
    }

    return <>{content}</>;
};

export default FollowButton;