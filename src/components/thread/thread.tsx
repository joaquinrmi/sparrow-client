import React, { useContext } from "react";
import { CheepListName } from "../../pages/sparrow/state";
import StateContext from "../../pages/sparrow/state_context";
import Cheep from "../cheep";

export interface Props
{
    name: CheepListName;
}

const Thread: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    const cheepList = state.cheepLists[props.name];

    return <>
        {cheepList.cheeps.map(
            (cheepData, index) =>
            {
                return <Cheep key={`${index}-cheep`} id={`${index}-cheep-${props.name}`} data={cheepData} index={index} listName={props.name} />;
            }
        )}
    </>;
}

export default Thread;