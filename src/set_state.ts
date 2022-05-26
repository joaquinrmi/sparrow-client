import ChangeState from "./change_state";

type SetState<StateType> = {
    [Key in keyof StateType]-?: ChangeState<StateType[Key]>;
};

export default SetState;