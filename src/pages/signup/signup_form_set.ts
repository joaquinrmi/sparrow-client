import SignupForm from "./signup_form";

type SignupFormSet = {
    [Prop in keyof SignupForm]?: SignupForm[Prop]
};

export default SignupFormSet;