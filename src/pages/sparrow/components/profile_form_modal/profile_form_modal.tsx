import React from "react";
import Modal from "../../../../components/modal";
import ProfileForm from "../profile_form/profile_form";

import "./profile_form_modal.scss";

export interface Props
{}

const ProfileFormModal: React.FunctionComponent<Props> = (props) =>
{
    return <Modal id="profile-form-modal" className="profile-form-modal" closeRequest={() =>
    {}}>
        <ProfileForm />
    </Modal>;
};

export default ProfileFormModal;