import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ModalForm from "../../../../components/modal_form";
import UserPicture from "../../../../components/user_picture";
import SessionContext from "../../../../session_context";
import Button, { ButtonStyle } from "../../../../components/button";
import ButtonContainer from "../../../../components/button_container";
import TextEditor from "./components/text_editor";
import Loading from "../../../../components/loading";

import "./cheep_editor.scss";

export interface Props
{
    id: string;
}

const CheepEditor: React.FunctionComponent<Props> = (props) =>
{
    const [ buttonEnabled, setButtonEnabled ] = useState<boolean>(false);
    const [ status, setStatus ] = useState<number>(0);

    const userSession = useContext(SessionContext);
    const navigation = useNavigate();

    return <ModalForm className="cheep-editor">
        <div className="modal-form-top">
            <span className="modal-form-close-button" onClick={() =>
            {
                navigation(-1);
            }}>
                <i className="fa-solid fa-xmark"></i>
            </span>
        </div>

        <section className="editor-body">
            <div className="editor-columns">
                <div className="editor-left">
                    <UserPicture notClickeable userHandle={userSession.user.handle} userName={userSession.user.name} picture={userSession.user.picture} />
                </div>
                <div className="editor-right">
                    <div className="text-editor-container">
                        <TextEditor id={`${props.id}-editor`} maxLength={280} setStatus={(status) =>
                        {
                            setStatus(status);
                            if(status > 0)
                            {
                                setButtonEnabled(true);
                            }
                            else
                            {
                                setButtonEnabled(false);
                            }
                        }} />
                    </div>

                    <footer className="editor-bottom">
                        <div className="options-container">
                            <div className="editor-button">
                                <i className="fa-solid fa-image"></i>
                            </div>

                            <div className="status-container">
                                <Loading static status={status} radius={10} thickness={2} />
                            </div>
                        </div>

                        <ButtonContainer className="cheep-button-container">
                            <Button stylePreset={ButtonStyle.Blue} disabled={!buttonEnabled}>
                                Cheepear
                            </Button>
                        </ButtonContainer>
                    </footer>
                </div>
            </div>
        </section>
    </ModalForm>
};

export default CheepEditor;