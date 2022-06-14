import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getCheep from "../../../../cheep/get_cheep";
import processCheep from "../../../../cheep/process_cheep";
import CheepData from "../../../../cheep_data";
import StatusMessageContext from "../../../../status_message_context";
import CheepPage from "../../../cheep_page";
import StateContext from "../../state_context";
import Slider from "./components/slider";

import "./cheep_gallery_modal.scss";

export interface Props
{
    userHandle: string;
    cheepId: number;
    photoIndex: number;
}

const CheepGalleryModal: React.FunctionComponent<Props> = (props) =>
{
    const statusMessage = useContext(StatusMessageContext);
    const [ state, stateManager ] = useContext(StateContext);

    const navigate = useNavigate();

    let cheepData: CheepData | undefined;
    let photoIndex: number | undefined;
    if(state.cheepGalleryModal)
    {
        cheepData = state.cheepGalleryModal.data;
        photoIndex = state.cheepGalleryModal.photoIndex;
    }

    useEffect(() =>
    {
        if(cheepData !== undefined && (cheepData.id === props.cheepId))
        {
            return;
        }

        (async () =>
        {
            try
            {
                var data = processCheep(await getCheep(props.cheepId), false);
            }
            catch(err)
            {
                statusMessage("Error al cargar el cheep.");
                navigate(-1);

                return;
            }

            stateManager.setCheepGalleryModal(data, props.photoIndex);
        })();
    });

    useEffect(() =>
    {
        let navigateOnGallery = (ev: KeyboardEvent) =>
        {
            switch(ev.key)
            {
            case "ArrowRight":
                if(cheepData !== undefined && props.photoIndex >= cheepData.gallery.length)
                {
                    return;
                }

                navigate(`/${props.userHandle}/status/${props.cheepId}/photo/${props.photoIndex + 1}`);
                break;

            case "ArrowLeft":
                if(cheepData !== undefined && props.photoIndex <= 1)
                {
                    return;
                }

                navigate(`/${props.userHandle}/status/${props.cheepId}/photo/${props.photoIndex - 1}`);
                break;
            }
        };

        document.addEventListener("keydown", navigateOnGallery);

        return () =>
        {
            document.removeEventListener("keydown", navigateOnGallery);
        }
    });

    let content: React.ReactNode;
    if(cheepData !== undefined && photoIndex !== undefined && props.cheepId === cheepData.id)
    {
        if(props.photoIndex < 1)
        {
            content = <></>;

            stateManager.setCheepGalleryModal(cheepData, 1);
            navigate(`/${props.userHandle}/status/${props.cheepId}/photo/1`);
        }
        else if(props.photoIndex - 1 >= cheepData.gallery.length)
        {
            content = <></>;

            stateManager.setCheepGalleryModal(cheepData, cheepData.gallery.length);
            navigate(`/${props.userHandle}/status/${props.cheepId}/photo/${cheepData.gallery.length}`);
        }
        else
        {
            content = <>
                <section className="gallery-container">
                    <Slider gallery={cheepData.gallery} currentIndex={props.photoIndex - 1} />
                </section>

                <section className="cheep-container">
                    <CheepPage id="cheep-modal-cheep" cheepId={cheepData.id} data={cheepData} hideGallery hideHeader />
                </section>
            </>;
        }
    }
    else
    {
        content = <></>;
    }

    return <div className="cheep-gallery-modal">
        <div className="cheep-modal-container">
            {content}
        </div>
    </div>;
};

export default CheepGalleryModal;