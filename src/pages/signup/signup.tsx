import React, { useState } from "react";
import FirstPage from "./components/first_page";
import SignupForm from "./signup_form";
import SignupFormSet from "./signup_form_set";

import "./signup.scss";
import SecondPage from "./components/second_page";

const Signup: React.FunctionComponent = () =>
{
    const [ state, setSate ] = useState<{
        currentPage: number,
        signupData: SignupForm
    }>({
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
                currentPage: page,
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
        content = <SecondPage signupData={state.signupData} changePage={changePage} />;
    }

    return <div className="signup-page">
        <div className="page-align">
            {content}
        </div>
    </div>;
};

export default Signup;