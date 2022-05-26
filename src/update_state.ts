import React from "react";

type SetStateFunction<StateType> = React.Dispatch<React.SetStateAction<StateType>>;

type UpdatingState<StateType> = {
    [Key in keyof StateType]?: StateType[Key];
};

function UpdateState<StateType>(setState: SetStateFunction<StateType>, value: UpdatingState<StateType>)
{
    setState((state) =>
    {
        return {
            ...state,
            ...value
        };
    });
}

export default UpdateState;