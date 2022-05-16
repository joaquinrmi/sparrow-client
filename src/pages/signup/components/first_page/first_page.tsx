import React, { useState, useEffect } from "react";

import FormInput, { FormInputElement } from "../../../../components/form_input/";
import DateInput, { DateInputElement } from "../../../../components/date_input";
import Button, { ButtonStyle } from "../../../../components/button";
import SignupForm from "../../signup_form";
import SignupFormSet from "../../signup_form_set";

import "./first_page.scss";

export interface Props
{
    signupData: SignupForm;
    changePage(page: number, data: SignupFormSet): void;
}

const FirstPage: React.FunctionComponent<Props> = (props) =>
{
    const [ enableNext, setEnableNext ] = useState(false);

    useEffect(() =>
    {
        const nameInput = document.getElementById("signup-name") as FormInputElement;
        const emailInput = document.getElementById("signup-email") as FormInputElement;

        const emailRegex = /^[a-zA-Z\-_0-9]*@[a-zA-Z\-_0-9]*\.com$/;

        const checkEnableNext = () =>
        {
            if(nameInput.getValue().trim().length === 0)
            {
                setEnableNext(false);
                return;
            }

            const email = emailInput.getValue();
            const match = email.match(emailRegex);

            if(match === null || match.length !== 1)
            {
                setEnableNext(false);
                return;
            }

            setEnableNext(true);
        };

        nameInput.addEventListener("change", () =>
        {
            checkEnableNext();
        });

        emailInput.addEventListener("change", () =>
        {
            checkEnableNext();
        });
    },
    []);

    return <div className="form-modal">
        <header className="signup-form-top">
            <div id="signup-close-button">
                <i className="fa-solid fa-xmark"></i>
            </div>
        </header>

        <section className="signup-form-body">
            <h1>Crea tu cuenta</h1>

            <div className="form-elements">
                <FormInput id="signup-name" title="Nombre" value={props.signupData.name} />

                <FormInput id="signup-email" title="Correo electrónico" value={props.signupData.email} />

                <div className="birthdate-text">
                    <span className="birthdate-title">Fecha de nacimiento</span>

                    <span>Esta información no se mostrará públicamente y, de hecho, no sirve para nada más que alargar el formulario.</span>
                </div>
                
                <DateInput id="signup-date-input" className="signup-date-form" value={props.signupData.birthdate} />
            </div>
        </section>

        <footer className="signup-form-bottom">
            <div className="button-container">
                <Button stylePreset={ButtonStyle.Blue} disabled={!enableNext} onClick={(ev) =>
                {
                    const nameInput = document.getElementById("signup-name") as FormInputElement;
                    const emailInput = document.getElementById("signup-email") as FormInputElement;
                    const dateInput = document.getElementById("signup-date-input") as DateInputElement;

                    props.changePage(2, {
                        name: nameInput.getValue(),
                        email: emailInput.getValue(),
                        birthdate: new Date(dateInput.getYear(), dateInput.getMonth(), dateInput.getDay())
                    });
                }}>
                    Siguiente
                </Button>
            </div>
        </footer>
    </div>;
};

export default FirstPage;