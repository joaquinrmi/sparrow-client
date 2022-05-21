import React, { useState, useEffect } from "react";
import SignupForm from "../../signup_form";
import SignupFormSet from "../../signup_form_set";
import FormInput, { FormInputType, FormInputElement } from "../../../../components/form_input/";
import Button, { ButtonStyle } from "../../../../components/button";

import "./second_page.scss";

export interface Props
{
    signupData: SignupForm;
    changePage(page: number, data: SignupFormSet): void;
    sendForm(data: SignupFormSet): Promise<void>;
}

const HANDLE_ERROR_MESSAGE = `El nombre de usuario solo puede contener letras minúsculas, números y los signos "_" y "." y una longitud entre 4 y 15 caracteres.`;
const PASSWORD_ERROR_MESSAGE = "La contraseña debe tener entre 8 y 20 caracteres de longitud.";
const REPASSWORD_ERROR_MESSAGE = "Las contraseñas con coinciden.";

const SecondPage: React.FunctionComponent<Props> = (props) =>
{
    const [ enableButton, setEnableButton ] = useState(false);
    const [ handleError, setHandleError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");
    const [ repasswordError, setRepasswordError ] = useState("");

    useEffect(() =>
    {
        const handleInput = document.getElementById("signup-handle") as FormInputElement;
        const passwordInput = document.getElementById("signup-password") as FormInputElement;
        const repasswordInput = document.getElementById("signup-repassword") as FormInputElement;

        const handleRegex = /^[a-z\._0-9]*$/;

        const checkEnableButton = () =>
        {
            if(passwordInput.getValue().length < 8 || passwordInput.getValue().length > 20)
            {
                setEnableButton(false);
                return;
            }

            if(passwordInput.getValue() !== repasswordInput.getValue())
            {
                setEnableButton(false);
                return;
            }

            if(handleInput.getValue().length < 4 || !handleInput.getValue().match(handleRegex))
            {
                setEnableButton(false);
                return;
            }

            setEnableButton(true);
        };

        handleInput.onchange = () =>
        {
            checkEnableButton();

            if(handleInput.getValue().length > 0)
            {
                if(handleInput.getValue().length < 4 || !handleInput.getValue().match(handleRegex))
                {
                    setHandleError(HANDLE_ERROR_MESSAGE);
                }
                else
                {
                    setHandleError("");
                }
            }
            else
            {
                setHandleError("");
            }
        };

        passwordInput.onchange = () =>
        {
            checkEnableButton();

            if(passwordInput.getValue().length < 8 || passwordInput.getValue().length > 20)
            {
                setPasswordError(PASSWORD_ERROR_MESSAGE);
            }
            else
            {
                setPasswordError("");
            }

            if(repasswordInput.getValue().length > 0 && passwordInput.getValue() !== repasswordInput.getValue())
            {
                setRepasswordError(REPASSWORD_ERROR_MESSAGE);
            }
            else
            {
                setRepasswordError("");
            }
        };

        repasswordInput.onchange = () =>
        {
            checkEnableButton();

            if(repasswordInput.getValue().length > 0 && passwordInput.getValue() !== repasswordInput.getValue())
            {
                setRepasswordError(REPASSWORD_ERROR_MESSAGE);
            }
            else
            {
                setRepasswordError("");
            }
        };

        const goBackButton = document.getElementById("signup-go-back-button") as HTMLDivElement;

        goBackButton.onclick = () =>
        {
            props.changePage(1, {
                handle: handleInput.getValue(),
                password: passwordInput.getValue(),
                repassword: repasswordInput.getValue()
            });
        };
    },
    []);

    return <div className="form-modal">
        <header className="signup-form-top">
            <div id="signup-go-back-button">
                <i className="fa-solid fa-arrow-left"></i>
            </div>
        </header>

        <section className="signup-form-body">
            <h1>Termina el registro</h1>

            <div className="form-elements">
                <FormInput id="signup-handle" title="Nombre de usuario" value={props.signupData.handle} errorMessage={handleError} />

                <FormInput id="signup-password" type={FormInputType.Password} title="Contraseña" value={props.signupData.password} errorMessage={passwordError} />

                <FormInput id="signup-repassword" type={FormInputType.Password} title="Reingresa la contraseña" value={props.signupData.repassword} errorMessage={repasswordError} />
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