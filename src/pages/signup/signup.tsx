import React, { useState, useEffect } from "react";
import FirstPage from "./components/first_page";

import "./signup.scss";
import SignupForm from "./signup_form";

const Signup: React.FunctionComponent = () =>
{
    const [ signupData, setSignupData ] = useState<SignupForm>({
        name: "",
        email: "",
        birthdate: new Date(),
        handle: "",
        password: "",
        repassword: ""
    });

    return <FirstPage />;
};

type SignupFormSet = {
    [Prop in keyof SignupForm]?: SignupForm[Prop]
};

export default Signup;