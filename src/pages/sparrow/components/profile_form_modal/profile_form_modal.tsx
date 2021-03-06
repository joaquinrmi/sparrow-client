import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/modal";
import StateContext from "../../state_context";
import ProfileForm from "../profile_form/profile_form";

import "./profile_form_modal.scss";

export interface Props
{}

const ProfileFormModal: React.FunctionComponent<Props> = (props) =>
{
    const [ hasChanged, setHasChanged ] = useState<boolean>(false);

    const [ state, stateManager ] = useContext(StateContext);

    const navigate = useNavigate();

    const closeRequest = () =>
    {
        setHasChanged(
            (hasChanged) =>
            {
                if(hasChanged)
                {
                    stateManager.openCloseConfirmation(
                        () =>
                        {
                            stateManager.closeCloseConfirmation();
                            navigate(-1);
                        }
                    );
                }
                else
                {
                    navigate(-1);
                }

                return hasChanged;
            }
        );
    };

    return <Modal id="profile-form-modal" className="profile-form-modal" changeBodyOverflow closeRequest={closeRequest}>
        <ProfileForm
            closeRequest={closeRequest}
            somethingHasBeenTouched={() =>
            {
                setHasChanged(true);
            }}
            success={() =>
            {
                navigate(-1);
            }}
        />
    </Modal>;
};

export default ProfileFormModal;