import React, { useState } from "react";
import FirstPage from "./components/first_page";
import SignupForm from "./signup_form";
import SignupFormSet from "./signup_form_set";

import "./signup.scss";

const Signup: React.FunctionComponent = () =>
{
    const [ state, setSate ] = useState<{
        currentPage: number,
        signupData: SignupForm
    }>({
        currentPage: 0,
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
        if(page !== 0 && page !== 1)
        {
            page = 0;
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

    return <FirstPage signupData={state.signupData} changePage={changePage} />;
};

export default Signup;