import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/modal";
import ModalForm from "../../components/modal_form";
import FormInput, { FormInputType, FormInputElement } from "../../components/form_input/form_input";
import Button, { ButtonStyle } from "../../components/button";
import login from "../../login";
import LoginForm from "../../login_form";
import SessionContext from "../../session_context";
import LoadingPage from "../loading_page";

import "./login.scss";

const Login: React.FunctionComponent = () =>
{
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ enableButton, setEnableButton ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const [ handleOrEmail, setHandleOrEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");

    const [ handleError, setHandleError ] = useState<string>("");
    const [ passwordError, setPasswordError ] = useState<string>("");

    useEffect(() =>
    {
        const handleOrEmailInput = document.getElementById("login-handle-or-email") as FormInputElement;
        const passwordInput = document.getElementById("login-password") as FormInputElement;

        const checkEnableButton = () =>
        {
            if(handleOrEmailInput.getValue().length > 0 && passwordInput.getValue().length > 0)
            {
                setEnableButton(true);
            }
            else
            {
                setEnableButton(false);
            }
        };

        handleOrEmailInput.onchange = () =>
        {
            checkEnableButton();

            setHandleOrEmail(handleOrEmailInput.getValue());
        };

        passwordInput.onchange = () =>
        {
            checkEnableButton();

            setPassword(passwordInput.getValue());
        };
    },
    []);

    if(loading)
    {
        return <LoadingPage />;
    }

    return <SessionContext.Consumer>{(session) =>
    {
        return <Modal id="login-modal" className="login-modal" closeRequest={() =>
        {}}>
            <ModalForm className="login-form-modal">
                <div className="modal-form-top">
                    <Link to="/" className="modal-form-close-button">
                        <i className="fa-solid fa-xmark"></i>
                    </Link>
                </div>
    
                <section className="modal-form-body">
                    <h1>Inicio de sesión</h1>

                    {errorMessage.length > 0 ?
                        <span className="error-message">
                            {errorMessage}
                        </span> :
                        null
                    }
    
                    <div className="form-elements">
                        <FormInput id="login-handle-or-email" title="Nombre de usuario o email" value={handleOrEmail} errorMessage={handleError} />
    
                        <FormInput id="login-password" type={FormInputType.Password} title="Contraseña" value={password} errorMessage={passwordError} />
                    </div>
                </section>
    
                <footer className="modal-form-bottom">
                    <div className="button-container">
                        <Button stylePreset={ButtonStyle.Blue} disabled={!enableButton} onClick={async () =>
                        {
                            setLoading(true);

                            const handleOrEmailInput = document.getElementById("login-handle-or-email") as FormInputElement;
                            const passwordInput = document.getElementById("login-password") as FormInputElement;
    
                            let form: LoginForm = {
                                handleOrEmail: handleOrEmailInput.getValue(),
                                password: passwordInput.getValue(),
                                remember: true
                            };
    
                            try
                            {
                                var userData = await login(form);
                            }
                            catch(err: any)
                            {
                                if(err.status === 401)
                                {
                                    setErrorMessage("Combinación usuario-contraseña incorrecta.");
                                    setHandleError("Revisa el nombre de usuario.");
                                    setPasswordError("Revisa la contraseña.");
                                    setLoading(false);
                                }

                                return;
                            }

                            session.login(userData);
                        }}>
                            Iniciar sesión
                        </Button>
                    </div>
                </footer>
            </ModalForm>
        </Modal>;
    }}</SessionContext.Consumer>
};

export default Login;