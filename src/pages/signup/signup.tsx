import React, { useContext, useEffect, useState } from "react";
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
import SignupError from "./signup_error";

import "./signup.scss";

const Signup: React.FunctionComponent = () =>
{
    const userSession = useContext(SessionContext);

    const [ state, setSate ] = useState<SignupState>(
        {
            sendForm: false,
            currentPage: 1,
            signupData:
            {
                name: "",
                email: "",
                birthdate: new Date(),
                handle: "",
                password: "",
                repassword: ""
            },
            error: {}
        }
    );

    useEffect(
        () =>
        {
            if(state.sendForm)
            {
                (async () =>
                {
                    const response = await sendSignupForm(state.signupData, userSession);

                    if(response !== undefined)
                    {
                        let error: SignupError = {};
                        let currentPage = 2;

                        for(let i = 0; i < response.error.length; ++i)
                        {
                            const errorType = response.error[i];

                            switch(errorType)
                            {
                            case "Email Already Exists":
                                error.email = "El correo electrónico ya está en uso.";
                                currentPage = 1;
                                break;

                            case "Username Already Exists":
                                error.handle = "El nombre de usuario ya está en uso.";
                                break;
                            }
                        }

                        setSate(
                            (state) =>
                            {
                                return {
                                    ...state,
                                    sendForm: false,
                                    currentPage: currentPage,
                                    error:
                                    {
                                        ...state.error,
                                        ...error
                                    }
                                };
                            }
                        )
                    }
                })();
            }
        },
        [ state.sendForm ]
    );

    const changePage = (page: number, data: SignupFormSet) =>
    {
        if(page !== 1 && page !== 2)
        {
            page = 1;
        }

        setSate(
            (currentState) =>
            {
                return {
                    sendForm: false,
                    currentPage: page,
                    signupData:
                    {
                        ...currentState.signupData,
                        ...data
                    },
                    error:
                    {
                        ...currentState.error
                    }
                };
            }
        );
    };

    const setError = (error: SignupError) =>
    {
        setSate(
            (currentState) =>
            {
                return {
                    ...currentState,
                    error:
                    {
                        ...currentState.error,
                        ...error
                    }
                };
            }
        );
    }

    const sendForm = async (data: SignupFormSet) =>
    {
        setSate(
            (currentState) =>
            {
                return {
                    sendForm: true,
                    currentPage: currentState.currentPage,
                    signupData:
                    {
                        ...currentState.signupData,
                        ...data
                    },
                    error:
                    {
                        ...currentState.error
                    }
                };
            }
        );
    };

    let content: React.ReactNode;

    if(state.sendForm)
    {
        return <LoadingPage />;
    }
    else if(state.currentPage === 1)
    {
        content = <FirstPage signupData={state.signupData} error={state.error} changePage={changePage} setError={setError} />;
    }
    else
    {
        content = <SecondPage signupData={state.signupData} error={state.error} changePage={changePage} sendForm={sendForm} setError={setError} />;
    }

    return <Modal id="signup-modal" className="signup-modal" closeRequest={() =>
    {}}>
        {content}
    </Modal>;
};

async function sendSignupForm(signupData: SignupForm, session: UserSession): Promise<any>
{
    const form: CreateUserForm =
    {
        handle: signupData.handle,
        email: signupData.email,
        password: signupData.password,
        fullName: signupData.name,
        birthdate: signupData.birthdate.getTime(),
    };

    if(process.env.REACT_APP_SERVER)
    {
        const signupURL = `${process.env.REACT_APP_SERVER}/api/user/create`;

        const response = await fetch(
            signupURL,
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
                credentials: "include"
            }
        );

        if(response.status === 201)
        {
            const { handle } = await response.json() as { handle: string };

            try
            {
                var userData = await login(
                    {
                        handleOrEmail: handle,
                        password: form.password,
                        remember: true
                    }
                );
            }
            catch(err)
            {
                return;
            }

            session.login(userData);
        }
        else
        {
            return await response.json();
        }
    }
    else
    {
        return;
    }
}

interface SignupState
{
    sendForm: boolean;
    currentPage: number;
    signupData: SignupForm;
    error: SignupError;
}

export default Signup;