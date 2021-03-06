import React, { useState, useEffect, useContext } from "react";
import UserPicture from "../../../../components/user_picture";
import SessionContext from "../../../../session_context";
import Button, { ButtonStyle } from "../../../../components/button";
import ButtonContainer from "../../../../components/button_container";
import TextEditor, { TextEditorElement } from "./components/text_editor";
import Loading from "../../../../components/loading";
import Gallery from "../../../../components/gallery";
import uploadImage, { ImageType } from "../../../../upload_image";
import CreateCheepData from "./create_cheep_data";
import postCheep from "./post_cheep";
import ResponseErrorType from "../../../../response_error_type";
import CheepData from "../../../../cheep_data";
import Cheep from "../../../../components/cheep";
import StateContext from "../../state_context";

import "./cheep_editor.scss";

export interface Props
{
    id: string;
    responseTarget?: CheepData;
    targetCheep?: CheepData;
    inPage?: boolean;

    onCheep?(): void;
}

export interface CheepEditorElement extends HTMLDivElement
{
    hasContent(): boolean;
}

const CheepEditor: React.FunctionComponent<Props> = (props) =>
{
    const [ buttonEnabled, setButtonEnabled ] = useState<boolean>(props.targetCheep !== undefined);
    const [ status, setStatus ] = useState<number>(0);
    const [ gallery, setGallery ] = useState<Array<string>>([]);
    const [ loadingPictures, setLoadingPictures ] = useState<boolean>(false);
    const [ loadingCheep, setLoadingCheep ] = useState<boolean>(false);
    const [ created, setCreated ] = useState<number>(0);

    const userSession = useContext(SessionContext);
    const [ state, stateManager ] = useContext(StateContext);

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
                    imageUrls.push(await uploadImage(pictureInput.files[i], ImageType.Gallery));
                }
                catch(err)
                {
                    setLoadingPictures(false);
                    return;
                }
            }

            setLoadingPictures(false);
            setButtonEnabled(true);
            setGallery(
                (currentGallery) =>
                {
                    return [
                        ...currentGallery,
                        ...imageUrls
                    ];
                }
            );
        };
    });

    useEffect(() =>
    {
        const element = document.getElementById(props.id) as CheepEditorElement;
        if(element === null)
        {
            return;
        }

        element.hasContent = () =>
        {
            return status > 0 || gallery.length > 0;
        };
    })

    return <form key={created} id={props.id} className={`cheep-editor ${props.inPage ? "in-page" : ""}`}>
        {props.inPage && props.responseTarget ?
            <div className="response-message">
                En respuesta a <span className="user">@{props.responseTarget.author.handle}</span>
            </div> :
            null
        }

        <section className="editor-body">
            <div className="editor-columns">
                <div className="editor-left">
                    <UserPicture notClickeable userHandle={userSession.user.handle} userName={userSession.user.name} picture={userSession.user.picture} />
                </div>

                <div className="editor-right">
                    <div className="editor-elements">
                        <div className={`text-editor-container ${props.targetCheep || gallery.length > 0 ? "mini" : ""}`}>
                            <TextEditor
                                id={`${props.id}-editor`}
                                maxLength={280}
                                setStatus={(status) =>
                                {
                                    if(status > 0)
                                    {
                                        setButtonEnabled(true);
                                    }
                                    else
                                    {
                                        setGallery(
                                            (gallery) =>
                                            {
                                                if(gallery.length === 0)
                                                {
                                                    setButtonEnabled(false);
                                                }

                                                return gallery;
                                            }
                                        );
                                    }
                                    setStatus(status);
                                }}
                            />
                        </div>

                        {gallery.length > 0 || loadingPictures ?
                            <div className="gallery-container">
                                <Gallery pictures={gallery} disableClick />

                                {loadingPictures ?
                                    <div className="loading-pictures">
                                        <Loading />
                                    </div> :
                                    null
                                }
                            </div> :
                            null
                        }

                        {props.targetCheep ?
                            <div className="quote-container">
                                <Cheep id={`quote-${props.id}`} data={props.targetCheep} quote />
                            </div> :
                            null
                        }
                    </div>

                    <footer className="editor-bottom">
                        <div className="options-container">
                            <div className={`editor-button ${gallery.length === 4 ? "disabled" : ""}`} onClick={() =>
                            {
                                if(loadingPictures || gallery.length === 4)
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
                            <Button
                                stylePreset={ButtonStyle.Blue}
                                disabled={!buttonEnabled}
                                onClick={async () =>
                                {
                                    if(loadingCheep)
                                    {
                                        return;
                                    }

                                    setLoadingCheep(true);

                                    const editor = document.getElementById(`${props.id}-editor`) as TextEditorElement;

                                    const data: CreateCheepData = {};

                                    if(editor.getText().length > 0)
                                    {
                                        data.content = editor.getText();
                                    }

                                    if(gallery.length > 0)
                                    {
                                        data.gallery = gallery;
                                    }

                                    if(props.responseTarget !== undefined)
                                    {
                                        data.responseTarget = props.responseTarget.id;
                                    }

                                    if(props.targetCheep !== undefined)
                                    {
                                        data.quoteTarget = props.targetCheep.id;
                                    }

                                    let cheepId: number;
                                    try
                                    {
                                        cheepId = await postCheep(data);
                                        setCreated((created) => created + 1);
                                        setStatus(0);
                                        stateManager.setStatusMessage("??Se public?? el cheep!");
                                        
                                        if(props.onCheep !== undefined)
                                        {
                                            props.onCheep();
                                        }
                                    }
                                    catch(err: any)
                                    {
                                        switch(err.error)
                                        {
                                        case ResponseErrorType.InvalidCheepContent:
                                            stateManager.setStatusMessage("El cheep no puede estar vac??o.");
                                            break;

                                        case ResponseErrorType.InvalidForm:
                                            stateManager.setStatusMessage("El contenido el cheep es inv??lido.");
                                            break;

                                        case ResponseErrorType.InternalServerError:
                                            stateManager.setStatusMessage("Ocurri?? un error en el servidor.");
                                            break;
                                        }
                                    }

                                    setLoadingCheep(false);
                                }}
                            >
                                Cheepear
                            </Button>
                        </ButtonContainer>
                    </footer>
                </div>
            </div>
        </section>
    </form>
};

export default CheepEditor;