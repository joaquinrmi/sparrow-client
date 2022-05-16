import React, { useState, useEffect } from "react";
import SignupForm from "../../signup_form";
import SignupFormSet from "../../signup_form_set";
import FormInput from "../../../../components/form_input/";
import Button, { ButtonStyle } from "../../../../components/button";

import "./second_page.scss";

export interface Props
{
    signupData: SignupForm;
    changePage(page: number, data: SignupFormSet): void;
    sendForm(data: SignupFormSet): Promise<void>;
}

const SecondPage: React.FunctionComponent<Props> = (props) =>
{
    const [ enableNext, setEnableNext ] = useState(false);

    return <div className="form-modal">
        <header className="signup-form-top">
            <div id="signup-close-button">
                <i className="fa-solid fa-arrow-left"></i>
            </div>
        </header>

        <section className="signup-form-body">
            <h1>Termina el registro</h1>

            <div className="form-elements">
                <FormInput id="signup-handle" title="Nombre de usuario" value={props.signupData.handle} />

                <FormInput id="signup-password" title="Contraseña" value={props.signupData.password} />

                <FormInput id="signup-repassword" title="Reingresa la contraseña" value={props.signupData.repassword} />
            </div>
        </section>

        <footer className="signup-form-bottom">
            <div className="button-container">
                <Button stylePreset={ButtonStyle.Blue} disabled={!enableNext}>
                    Crear cuenta
                </Button>
            </div>
        </footer>
    </div>;
};

export default SecondPage;