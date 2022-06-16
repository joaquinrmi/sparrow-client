import { createContext } from "react";
import SparrowState from "./state";
import StateManager from "./state_manager";

const StateContext = createContext<[ SparrowState, StateManager ]>([
    {
        location: {
            profile: {
                currentRoute: ""
            },
            innerProfile: {
                currentRoute: ""
            }
        },
        profile: {
            data: {
                handle: "",
                name: "",
                picture: "",
                banner: "",
                description: "",
                location: "",
                birthdate: new Date(),
                joinDate: new Date(),
                website: "",
                cheepCount: 0,
                followersCount: 0,
                followingCount: 0
            }
        },
        cheepLists: {
            home: { query: {}, nextTime: 0, cheeps: [] },
            explore: { query: {}, nextTime: 0, cheeps: [] },
            profileCheeps: { query: {}, nextTime: 0, cheeps: [] },
            profileWithReplies: { query: {}, nextTime: 0, cheeps: [] },
            profileMedia: { query: {}, nextTime: 0, cheeps: [] },
            profileLikes: { query: {}, nextTime: 0, cheeps: [] },
            thread: { query: {}, nextTime: 0, cheeps: [] },
            comments: { query: {}, nextTime: 0, cheeps: [] },
            search: { query: {}, nextTime: 0, cheeps: [] },
        },
        cheepEditor: {},
        closeConfirmation: {
            open: false,
            discart() {}
        }
    },
    new StateManager()
]);

export default StateContext;