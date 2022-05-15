import React from "react";

import FormInput from "../../components/form_input/";
import DateInput from "../../components/date_input";
import Button, { ButtonStyle } from "../../components/button";

import "./signup.scss";

const Signup: React.FunctionComponent = () =>
{
    return <div className="signup-page">
        <div className="form-modal">
            <header className="signup-form-top">
                <div id="signup-close-button">
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </header>

            <section className="signup-form-body">
                <h1>Crea tu cuenta</h1>

                <div className="form-elements">
                    <FormInput id="signup-name" title="Nombre" />

                    <FormInput id="signup-email" title="Correo electrónico" />

                    <div className="birthdate-text">
                        <span className="birthdate-title">Fecha de nacimiento</span>

                        <span>Esta información no se mostrará públicamente y, de hecho, no sirve para nada más que alargar el formulario.</span>
                    </div>
                    
                    <DateInput id="signup-date-input" className="signup-date-form" />
                </div>
            </section>

            <footer className="signup-form-bottom">
                <div className="button-container">
                    <Button stylePreset={ButtonStyle.Blue}>Siguiente</Button>
                </div>
            </footer>
        </div>
    </div>;
};

export default Signup;