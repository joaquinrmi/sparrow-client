import { createContext } from "react";
import SparrowState from "./state";
import StateManager from "./state_manager";

const StateContext = createContext<[ SparrowState, StateManager ]>([
    {
        cheepLists: {
            home: { query: {}, nextTime: 0, cheeps: [] },
            explore: { query: {}, nextTime: 0, cheeps: [] },
            profileCheeps: { query: {}, nextTime: 0, cheeps: [] },
            profileWithReplies: { query: {}, nextTime: 0, cheeps: [] },
            profileMedia: { query: {}, nextTime: 0, cheeps: [] },
            profileLikes: { query: {}, nextTime: 0, cheeps: [] },
        }
    },
    new StateManager()
]);

export default StateContext;