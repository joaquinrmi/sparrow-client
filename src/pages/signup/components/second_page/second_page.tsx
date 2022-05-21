import React, { useState, useEffect } from "react";
import SignupForm from "../../signup_form";
import SignupFormSet from "../../signup_form_set";
import FormInput, { FormInputElement } from "../../../../components/form_input/";
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
    const [ enableButton, setEnableButton ] = useState(false);

    useEffect(() =>
    {
        const handleInput = document.getElementById("signup-handle") as FormInputElement;
        const passwordInput = document.getElementById("signup-password") as FormInputElement;
        const repasswordInput = document.getElementById("signup-repassword") as FormInputElement;

        const handleRegex = /^[a-zA-Z\-_0-9]*$/;

        const checkEnableButton = () =>
        {
            if(passwordInput.getValue().length < 8)
            {
                setEnableButton(false);
                return;
            }

            if(passwordInput.getValue() !== repasswordInput.getValue())
            {
                setEnableButton(false);
                return;
            }

            if(!handleInput.getValue().match(handleRegex))
            {
                setEnableButton(false);
                return;
            }

            setEnableButton(true);
        };

        handleInput.onchange = () =>
        {
            checkEnableButton();
        }

        passwordInput.onchange = () =>
        {
            checkEnableButton();
        }

        repasswordInput.onchange = () =>
        {
            checkEnableButton();
        }
    },
    []);

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
                <Button stylePreset={ButtonStyle.Blue} disabled={!enableButton}>
                    Crear cuenta
                </Button>
            </div>
        </footer>
    </div>;
};

export default SecondPage;