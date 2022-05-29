import React, { useState } from "react";
import FirstPage from "./components/first_page";
import SignupForm from "./signup_form";
import SignupFormSet from "./signup_form_set";
import SecondPage from "./components/second_page";
import SessionContext from "../../session_context";

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

    return <SessionContext.Consumer>{(session) =>
    {
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

        let content: any;
        if(state.currentPage === 1)
        {
            content = <FirstPage signupData={state.signupData} changePage={changePage} />;
        }
        else
        {
            content = <SecondPage signupData={state.signupData} changePage={changePage} sendForm={sendForm} />;
        }

        return <div className="signup-page">
            <div className="page-align">
                {content}
            </div>
        </div>;
    }}</SessionContext.Consumer>
};

interface SignupState
{
    sendForm: boolean;
    currentPage: number;
    signupData: SignupForm;
}

export default Signup;