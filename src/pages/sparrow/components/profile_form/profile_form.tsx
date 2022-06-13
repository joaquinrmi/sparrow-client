import React, { useContext, useState, useEffect } from "react";
import ModalForm from "../../../../components/modal_form";
import FormInput, { FormInputElement } from "../../../../components/form_input/";
import StateContext from "../../state_context";
import ImageButton from "./components/image_button";
import ProfileData from "../../profile_data";
import Button, { ButtonStyle } from "../../../../components/button";
import Loading from "../../../../components/loading";
import ProfileDataForm from "./profile_data_form";
import uploadImage, { ImageType } from "../../../../upload_image";
import StatusMessageContext from "../../../../status_message_context";

import "./profile_form.scss";

export interface Props
{
    somethingHasBeenTouched(): void;
    closeRequest(): void;
    success(): void;
}

const ProfileForm: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);
    const statusMessage = useContext(StatusMessageContext);

    const [ data, setData ] = useState<ProfileData>({ ...state.profile.data });
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() =>
    {
        const bannerInput = document.getElementById("profile-form-banner") as HTMLInputElement;
        const pictureInput = document.getElementById("profile-form-picture") as HTMLInputElement;

        bannerInput.onchange = () =>
        {
            props.somethingHasBeenTouched();

            setData((currentData) =>
            {
                let files = bannerInput.files;
                if(files === null)
                {
                    return currentData;
                }

                return {
                    ...currentData,
                    banner: URL.createObjectURL(files[0])
                };
            });
        };

        pictureInput.onchange = () =>
        {
            props.somethingHasBeenTouched();
            
            setData((currentData) =>
            {
                let files = pictureInput.files;
                if(files === null)
                {
                    return currentData;
                }

                return {
                    ...currentData,
                    picture: URL.createObjectURL(files[0])
                };
            });
        };
    },
    [ props ]);

    return <ModalForm className="profile-form">
        <div className="modal-form-top">
            <div className="modal-form-close-button" onClick={props.closeRequest}>
                <i className="fa-solid fa-xmark"></i>
            </div>

            <div className="profile-form-title">
                Editar perfil
            </div>

            <div className="save-button-container">
                <Button stylePreset={ButtonStyle.Black} onClick={() =>
                {
                    (async () =>
                    {
                        let form: ProfileDataForm = {};

                        const bannerInput = document.getElementById("profile-form-banner") as HTMLInputElement;

                        if(bannerInput.files !== null && bannerInput.files.length > 0)
                        {
                            form.banner = bannerInput.files[0];
                        }

                        const pictureInput = document.getElementById("profile-form-picture") as HTMLInputElement;

                        if(pictureInput.files !== null && pictureInput.files.length > 0)
                        {
                            form.picture = pictureInput.files[0];
                        }

                        const nameInput = document.getElementById("profile-name") as FormInputElement;

                        if(nameInput.getValue().length > 0)
                        {
                            form.name = nameInput.getValue();
                        }

                        const descriptionInput = document.getElementById("profile-description") as FormInputElement;

                        if(descriptionInput.getValue().length > 0)
                        {
                            form.description = descriptionInput.getValue();
                        }

                        const locationInput = document.getElementById("profile-location") as FormInputElement;

                        if(locationInput.getValue().length > 0)
                        {
                            form.location = locationInput.getValue();
                        }

                        const websiteInput = document.getElementById("profile-website") as FormInputElement;

                        if(websiteInput.getValue().length > 0)
                        {
                            form.website = websiteInput.getValue();
                        }

                        try
                        {
                            await sendProfileForm(form);
                            statusMessage("Información actualizada.");
                            props.success();
                        }
                        catch(err)
                        {
                            statusMessage("Ocurrió un error inesperado.");
                        }
                    })();

                    setLoading(true);
                }}>
                    Guardar
                </Button>
            </div>
        </div>

        <div className="modal-form-body">
            <div className="profile-form-header">
                <div className="banner-container">
                    <div className="banner">
                        {data.banner ?
                            <div className="banner-img" title="Imagen de portada" style={{
                                backgroundImage: `url(${data.banner})`
                            }}></div> :
                            null
                        }

                        <div className="veil">
                            <div className="buttons-container">
                                <ImageButton title="Agregar foto" onClick={(ev) =>
                                {
                                    const input = document.getElementById("profile-form-banner") as HTMLInputElement;

                                    input.click();
                                }}>
                                    <i className="fa-solid fa-camera"></i>
                                </ImageButton>

                                <ImageButton title="Eliminar foto" onClick={(ev) =>
                                {
                                    setData((currentData) =>
                                    {
                                        return {
                                            ...currentData,
                                            banner: ""
                                        };
                                    });
                                }}>
                                    <i className="fa-solid fa-xmark"></i>
                                </ImageButton>

                                <input type="file" id="profile-form-banner" className="hidden" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="picture-container">
                    <div className="picture">
                        {data.picture ?
                            <div className="picture-img" title="Imagen de perfil" style={{
                                backgroundImage: `url(${data.picture})`
                            }}></div> :
                            null
                        }

                        <div className="veil">
                            <ImageButton title="Agregar foto" onClick={(ev) =>
                            {
                                const input = document.getElementById("profile-form-picture") as HTMLInputElement;

                                input.click();
                            }}>
                                <i className="fa-solid fa-camera"></i>
                            </ImageButton>

                            <input type="file" id="profile-form-picture" className="hidden" />
                        </div>
                    </div>

                    <div className="picture-separator"></div>
                </div>
            </div>

            <div className="profile-form-inputs">
                <FormInput id="profile-name" title="Nombre" value={data.name} limit={50} onChange={() =>
                {
                    props.somethingHasBeenTouched();
                }} />
            
                <FormInput id="profile-description" title="Biografía" value={data.description} textarea limit={160} onChange={() =>
                {
                    props.somethingHasBeenTouched();
                }} />
                
                <FormInput id="profile-location" title="Ubicación" value={data.location} limit={30} onChange={() =>
                {
                    props.somethingHasBeenTouched();
                }} />

                <FormInput id="profile-website" title="Sitio web" value={data.website} limit={100} onChange={() =>
                {
                    props.somethingHasBeenTouched();
                }} />
            </div>
        </div>

        {loading ?
            <div className="loading-veil">
                <Loading />
            </div> :
            null
        }
    </ModalForm>;
};

async function sendProfileForm(form: ProfileDataForm): Promise<void>
{
    let bannerURL: string | undefined;
    if(form.banner)
    {
        try
        {
            bannerURL = await uploadImage(form.banner, ImageType.Banner);
        }
        catch(err)
        {
            throw err;
        }
    }

    let pictureURL: string | undefined;
    if(form.picture)
    {
        try
        {
            pictureURL = await uploadImage(form.picture, ImageType.ProfilePicture);
        }
        catch(err)
        {
            throw err;
        }
    }

    let data: any = {};

    if(bannerURL)
    {
        data.banner = bannerURL;
    }

    if(pictureURL)
    {
        data.picture = pictureURL;
    }

    if(form.name)
    {
        data.name = form.name;
    }

    if(form.description)
    {
        data.description = form.description;
    }

    if(form.location)
    {
        data.location = form.location;
    }

    if(form.website)
    {
        data.website = form.website;
    }

    const sendProfileURL = `${process.env.REACT_APP_SERVER}/api/profile/edit-profile`;

    const response = await fetch(sendProfileURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: "include"
    });

    if(response.status === 200)
    {
        return;
    }

    throw await response.json();
}

export default ProfileForm;