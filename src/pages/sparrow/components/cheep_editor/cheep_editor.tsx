import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ModalForm from "../../../../components/modal_form";
import UserPicture from "../../../../components/user_picture";
import SessionContext from "../../../../session_context";
import Button, { ButtonStyle } from "../../../../components/button";
import ButtonContainer from "../../../../components/button_container";
import TextEditor from "./components/text_editor";
import Loading from "../../../../components/loading";
import Gallery from "../../../../components/gallery";
import uploadImage from "../../../../upload_image";

import "./cheep_editor.scss";

export interface Props
{
    id: string;
}

const CheepEditor: React.FunctionComponent<Props> = (props) =>
{
    const [ buttonEnabled, setButtonEnabled ] = useState<boolean>(false);
    const [ status, setStatus ] = useState<number>(0);
    const [ gallery, setGallery ] = useState<Array<string>>([]);
    const [ loadingPictures, setLoadingPictures ] = useState<boolean>(false);

    const userSession = useContext(SessionContext);
    const navigation = useNavigate();

    useEffect(() =>
    {
        const pictureInput = document.getElementById(`${props.id}-gallery-input`) as HTMLInputElement;

        if(!pictureInput)
        {
            return;
        }

        pictureInput.onchange = async (ev) =>
        {
            if(loadingPictures)
            {
                return;
            }

            if(!pictureInput.files)
            {
                return;
            }

            if(pictureInput.files.length + gallery.length > 4)
            {
                return;
            }

            setLoadingPictures(true);

            let imageUrls = new Array<string>();
            for(let i = 0; i < pictureInput.files.length; ++i)
            {
                try
                {
                    imageUrls.push(await uploadImage(pictureInput.files[i]));
                }
                catch(err)
                {
                    console.log(err);
                    setLoadingPictures(false);
                    return;
                }
            }

            setLoadingPictures(false);
            setGallery((currentGallery) =>
            {
                return [
                    ...currentGallery,
                    ...imageUrls
                ];
            });
        };
    });

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
                    <div className="editor-elements">
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

                        {gallery.length > 0 ?
                            <div className="gallery-container">
                                <Gallery pictures={gallery} />
                            </div>:
                            null
                        }
                    </div>

                    <footer className="editor-bottom">
                        <div className="options-container">
                            <div className={`editor-button ${gallery.length === 4 ? "disabled" : ""}`} onClick={() =>
                            {
                                if(loadingPictures)
                                {
                                    return;
                                }

                                const input = document.getElementById(`${props.id}-gallery-input`) as HTMLInputElement;

                                if(!input)
                                {
                                    return;
                                }

                                input.click();
                            }}>
                                <i className="fa-solid fa-image"></i>
                                <input id={`${props.id}-gallery-input`} type="file" multiple />
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