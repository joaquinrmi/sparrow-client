import { createContext } from "react";
import SparrowState from "./state";
import StateManager from "./state_manager";

const StateContext = createContext<[ SparrowState, StateManager ]>([
    {
        cheepLists: {
            home: { query: {}, cheeps: [] },
            explore: { query: {}, cheeps: [] },
            profileCheeps: { query: {}, cheeps: [] },
            profileWithReplies: { query: {}, cheeps: [] },
            profileMedia: { query: {}, cheeps: [] },
            profileLikes: { query: {}, cheeps: [] },
        }
    },
    new StateManager()
]);

export default StateContext;