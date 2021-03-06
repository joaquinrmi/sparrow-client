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

import "./profile_form.scss";

export interface Props
{
    somethingHasBeenTouched(): void;
    closeRequest(): void;
    success(): void;
}

interface ProfileFormElement extends HTMLFormElement
{
    banner: HTMLInputElement;
    picture: HTMLInputElement;
    userName: HTMLInputElement;
    description: HTMLInputElement;
    location: HTMLInputElement;
    website: HTMLInputElement;
}

const ProfileForm: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    const [ data, setData ] = useState<ProfileData>({ ...state.profile.data });
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(
        () =>
        {
            const bannerInput = document.getElementById("profile-form-banner") as HTMLInputElement;
            const pictureInput = document.getElementById("profile-form-picture") as HTMLInputElement;

            bannerInput.onchange = () =>
            {
                props.somethingHasBeenTouched();

                setData(
                    (currentData) =>
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
                    }
                );
            };

            pictureInput.onchange = () =>
            {
                props.somethingHasBeenTouched();
                
                setData(
                    (currentData) =>
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
                    }
                );
            };
        },
        [ props ]
    );

    const sendForm = async (formElement: ProfileFormElement) =>
    {
        setLoading(true);

        let form: ProfileDataForm = {};

        const bannerInput = formElement.banner;
        const pictureInput = formElement.picture;
        const nameInput = formElement.userName;
        const descriptionInput = formElement.description;
        const locationInput = formElement.location;
        const websiteInput = formElement.website;

        if(!bannerInput || !pictureInput || !nameInput || !descriptionInput || !locationInput || !websiteInput) 
        {
            return;
        }

        if(bannerInput.files !== null && bannerInput.files.length > 0)
        {
            form.banner = bannerInput.files[0];
        }

        if(pictureInput.files !== null && pictureInput.files.length > 0)
        {
            form.picture = pictureInput.files[0];
        }

        if(nameInput.value.length > 0)
        {
            form.name = nameInput.value;
        }

        if(descriptionInput.value.length > 0)
        {
            form.description = descriptionInput.value;
        }

        if(locationInput.value.length > 0)
        {
            form.location = locationInput.value;
        }

        if(websiteInput.value.length > 0)
        {
            form.website = websiteInput.value;
        }

        try
        {
            await sendProfileForm(form);
            stateManager.setStatusMessage("Informaci??n actualizada.");
            props.success();
        }
        catch(err)
        {
            stateManager.setStatusMessage("Ocurri?? un error inesperado.");
        }
    };

    return <ModalForm
        id="edit-profile-form"
        className="profile-form"
        onSubmit={(ev) =>
        {
            ev.preventDefault();

            sendForm(ev.target as ProfileFormElement);
        }}
    >
        <div className="modal-form-top">
            <div className="modal-form-close-button" onClick={props.closeRequest}>
                <i className="fa-solid fa-xmark"></i>
            </div>

            <div className="profile-form-title">
                Editar perfil
            </div>

            <div className="save-button-container">
                <Button 
                    stylePreset={ButtonStyle.Black}
                    onClick={() =>
                    {
                        const form = document.getElementById("edit-profile-form") as ProfileFormElement;

                        if(form !== null)
                        {
                            sendForm(form);
                        }
                    }}
                >
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
                                <ImageButton
                                    title="Agregar foto"
                                    onClick={(ev) =>
                                    {
                                        const input = document.getElementById("profile-form-banner") as HTMLInputElement;

                                        input.click();
                                    }}
                                >
                                    <i className="fa-solid fa-camera"></i>
                                </ImageButton>

                                <ImageButton
                                    title="Eliminar foto"
                                    onClick={(ev) =>
                                    {
                                        setData(
                                            (currentData) =>
                                            {
                                                return {
                                                    ...currentData,
                                                    banner: ""
                                                };
                                            }
                                        );
                                    }}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </ImageButton>

                                <input name="banner" type="file" id="profile-form-banner" className="hidden" />
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
                            <ImageButton
                                title="Agregar foto"
                                onClick={(ev) =>
                                {
                                    const input = document.getElementById("profile-form-picture") as HTMLInputElement;

                                    input.click();
                                }}
                            >
                                <i className="fa-solid fa-camera"></i>
                            </ImageButton>

                            <input name="picture" type="file" id="profile-form-picture" className="hidden" />
                        </div>
                    </div>

                    <div className="picture-separator"></div>
                </div>
            </div>

            <div className="profile-form-inputs">
                <FormInput
                    id="profile-name"
                    name="userName"
                    title="Nombre"
                    value={data.name}
                    limit={50}
                    onChange={() =>
                    {
                        props.somethingHasBeenTouched();
                    }}
                />
            
                <FormInput
                    id="profile-description"
                    name="description"
                    title="Biograf??a"
                    value={data.description}
                    textarea
                    limit={160}
                    onChange={() =>
                    {
                        props.somethingHasBeenTouched();
                    }}
                />
                
                <FormInput
                    id="profile-location"
                    name="location"
                    title="Ubicaci??n"
                    value={data.location}
                    limit={30}
                    onChange={() =>
                    {
                        props.somethingHasBeenTouched();
                    }}
                />

                <FormInput
                    id="profile-website"
                    name="website"
                    title="Sitio web"
                    value={data.website}
                    limit={100}
                    onChange={() =>
                    {
                        props.somethingHasBeenTouched();
                    }}
                />
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

    const response = await fetch(
        sendProfileURL,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        }
    );

    if(response.status === 200)
    {
        return;
    }

    throw await response.json();
}

export default ProfileForm;