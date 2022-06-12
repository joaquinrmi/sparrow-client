import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalForm from "../../../../components/modal_form";
import FormInput from "../../../../components/form_input/";
import StateContext from "../../state_context";
import ImageButton from "./components/image_button";
import ProfileData from "../../profile_data";

import "./profile_form.scss";

export interface Props
{}

const ProfileForm: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    const [ data, setData ] = useState<ProfileData>({ ...state.profile.data });

    const navigate = useNavigate();

    useEffect(() =>
    {
        const bannerInput = document.getElementById("profile-form-banner") as HTMLInputElement;
        const pictureInput = document.getElementById("profile-form-picture") as HTMLInputElement;

        bannerInput.onchange = () =>
        {
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
            <div className="modal-form-close-button" onClick={() =>
            {
                navigate(-1);
            }}>
                <i className="fa-solid fa-xmark"></i>
            </div>

            <div className="profile-form-title">
                Editar perfil
            </div>
        </div>

        <div className="modal-form-body">
            <div className="profile-form-header">
                <div className="banner-container">
                    <div className="banner">
                        {data.banner ?
                            <img src={data.banner} alt="Imágen de portada" /> :
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
                <FormInput id="profile-name" title="Nombre" value={data.name} />
            
                <FormInput id="profile-description" title="Biografía" value={data.description} />
                
                <FormInput id="profile-location" title="Ubicación" value={data.location} />
            </div>
        </div>
    </ModalForm>;
};

export default ProfileForm;