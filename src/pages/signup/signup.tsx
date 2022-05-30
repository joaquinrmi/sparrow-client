import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FirstPage from "./components/first_page";
import SignupForm from "./signup_form";
import SignupFormSet from "./signup_form_set";
import SecondPage from "./components/second_page";
import LoadingPage from "../loading_page";
import Modal from "../../components/modal";

import login from "../../login";
import SessionContext from "../../session_context";
import CreateUserForm from "./create_user_form";
import UserSession from "../../user_session";

import "./signup.scss";

const Signup: React.FunctionComponent = () =>
{
    const [ state, setSate ] = useState<SignupState>({
        sendForm: false,
        currentPage: 1,
        signupData: {
            name: "",
            email: "",
            birthdate: new Date(),
            handle: "",
            password: "",
            repassword: ""
        }
    });

    const changePage = (page: number, data: SignupFormSet) =>
    {
        if(page !== 1 && page !== 2)
        {
            page = 1;
        }

        setSate((currentState) =>
        {
            return {
                sendForm: false,
                currentPage: page,
                signupData: {
                    ...currentState.signupData,
                    ...data
                }
            };
        });
    };

    const sendForm = async (data: SignupFormSet) =>
    {        
        setSate((currentState) =>
        {
            return {
                sendForm: true,
                currentPage: currentState.currentPage,
                signupData: {
                    ...currentState.signupData,
                    ...data
                }
            };
        });
    };

    const navigate = useNavigate();

    return <SessionContext.Consumer>{(session) =>
    {
        let content: any;

        if(state.sendForm)
        {
            sendSignupForm(state.signupData, session);

            return <LoadingPage />;
        }
        else if(state.currentPage === 1)
        {
            content = <FirstPage signupData={state.signupData} changePage={changePage} />;
        }
        else
        {
            content = <SecondPage signupData={state.signupData} changePage={changePage} sendForm={sendForm} />;
        }

        return <Modal id="signup-modal" closeRequest={() =>
        {}}>
            {content}
        </Modal>;
    }}</SessionContext.Consumer>
};

async function sendSignupForm(signupData: SignupForm, session: UserSession)
{
    const form: CreateUserForm = {
        handle: signupData.handle,
        email: signupData.email,
        password: signupData.password,
        fullName: signupData.name,
        birthdate: signupData.birthdate.getTime(),
    };

    if(process.env.REACT_APP_SERVER)
    {
        const signupURL = `${process.env.REACT_APP_SERVER}/api/user/create`;

        const response = await fetch(signupURL,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form),
            credentials: "include"
        });

        if(response.status === 201)
        {
            const { handle } = await response.json() as { handle: string };

            try
            {
                var userData = await login({
                    handleOrEmail: handle,
                    password: form.password,
                    remember: true
                });
            }
            catch(err)
            {
                return console.error(err);
            }

            session.login(userData);
        }
        else
        {
            console.error(await response.json());
        }
    }
    else
    {
        console.error("The server URL is not defined.");
    }
}

interface SignupState
{
    sendForm: boolean;
    currentPage: number;
    signupData: SignupForm;
}

export default Signup;