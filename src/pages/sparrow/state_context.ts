import { createContext } from "react";
import SparrowState from "./state";
import StateManager from "./state_manager";

const StateContext = createContext<[ SparrowState, StateManager ]>(
    [
        {
            location:
            {
                profile: { currentRoute: "" },
                innerProfile: { currentRoute: "" },
                relations: { currentRoute: "" },
                cheepPage: { currentRoute: "" },
                mainAsideSearch: { currentRoute: "" },
                mainAsideGallery: { currentRoute: "" },
            },
            profile:
            {
                data:
                {
                    handle: "",
                    name: "",
                    picture: "",
                    joinDate: new Date(),
                    followingCount: 0,
                    followersCount: 0,
                    cheepCount: 0,
                    following: false
                }
            },
            cheepLists:
            {
                home: { query: {}, nextTime: 0, cheeps: [] },
                explore: { query: {}, nextTime: 0, cheeps: [] },
                profileCheeps: { query: {}, nextTime: 0, cheeps: [] },
                profileWithReplies: { query: {}, nextTime: 0, cheeps: [] },
                profileMedia: { query: {}, nextTime: 0, cheeps: [] },
                profileLikes: { query: {}, nextTime: 0, cheeps: [] },
                thread: { query: {}, nextTime: 0, cheeps: [] },
                comments: { query: {}, nextTime: 0, cheeps: [] },
                search: { query: {}, nextTime: 0, cheeps: [] },
                quotes: { query: {}, nextTime: 0, cheeps: [] },
                userGallery: { query: {}, nextTime: 0, cheeps: [] },
            },
            userLists:
            {
                following: { id: "", target: "", users: [] },
                followers: { id: "", target: "", users: [] },
                likes: { id: "", target: "", users: [] },
                recheeps: { id: "", target: "", users: [] },
                asideRecommended: { id: "", target: "", users: [] },
                recommended: { id: "", target: "", users: [] },
            },
            cheepEditor: {},
            closeConfirmation:
            {
                open: false,
                discart() {}
            },
            unfollowConfirmation:
            {
                open: false,
                userHandle: "",
                unfollow() {}
            },
            mainAside: { userHandle: "" },
            statusMessage: { message: "" },
        },
        new StateManager()
    ]
);

export default StateContext;