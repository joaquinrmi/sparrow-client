import React, { useState, useEffect } from "react";
import Cheep from "../cheep/";
import Loading from "../loading";

import SearchCheepsQuery from "../../search_cheep_query";
import CheepData from "../../cheep_data";

import "./cheep_list.scss";

export interface Props
{
    arguments: SearchCheepsQuery;
    dataStatus: CheepListStatus;
    setDataStatus(dataStatus: CheepListStatus): void;
}

export interface CheepListStatus
{
    loaded: boolean;
    cheeps: Array<CheepData>;
}

const cheep0: CheepData = {
    id: 0,
    author: {
        handle: "sparrow",
        name: "Sparrow",
        picture: "https://www.revistaestilo.net/binrepository/trollface2_ES1218446_MG282389852.jpg",
    },
    dateCreated: new Date(),
    content: "Hola mundo!",
    gallery: [],
    commentCount: 46,
    likeCount: 287,
    recheepCount: 7,
    recheepped: false,
    liked: true
};

const cheep1: CheepData = {
    id: 1,
    author: {
        handle: "anhiladddo",
        name: "Pepe Sánchez",
        picture: "https://www.nombresdeperros.eu/wp-content/uploads/2020/12/cachorro-blanco-de-nombre-Toby.jpg"
    },
    dateCreated: new Date(),
    content: "Un lorem ipsum para hinchar las bolas.",
    gallery: [],
    commentCount: 0,
    likeCount: 0,
    recheepCount: 1,
    recheepped: true,
    liked: false
};

const cheep2: CheepData = {
    id: 2,
    author: {
        handle: "sparrow",
        name: "Sparrow",
        picture: "https://www.revistaestilo.net/binrepository/trollface2_ES1218446_MG282389852.jpg"
    },
    dateCreated: new Date(),
    content: "Ejemplo de citado.",
    gallery: [],
    quoteTarget: cheep1,
    commentCount: 0,
    likeCount: 0,
    recheepCount: 0,
    recheepped: false,
    liked: false
}

const cheep3: CheepData = {
    id: 3,
    author: {
        handle: "sparrow",
        name: "Sparrow",
        picture: "https://www.revistaestilo.net/binrepository/trollface2_ES1218446_MG282389852.jpg",
    },
    dateCreated: new Date(),
    content: "Ejemplo de galería",
    gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Eiche_bei_Graditz.jpg/1200px-Eiche_bei_Graditz.jpg",
        "https://www.elagoradiario.com/wp-content/uploads/2021/04/Pino-Castrej%C3%B3n-1140x600.jpg",
        "https://www.fundacionaquae.org/wp-content/uploads/2021/12/fresno-e1639053075597.jpg"
    ],
    commentCount: 0,
    likeCount: 0,
    recheepCount: 0,
    recheepped: false,
    liked: false
};

const cheep4: CheepData = {
    id: 4,
    author: {
        handle: "sparrow",
        name: "Sparrow",
        picture: "https://www.revistaestilo.net/binrepository/trollface2_ES1218446_MG282389852.jpg",
    },
    dateCreated: new Date(),
    content: "Cita con galería",
    gallery: [
        "https://geology.com/rocks/pictures/quartz-diorite.jpg"
    ],
    quoteTarget: cheep3,
    commentCount: 0,
    likeCount: 0,
    recheepCount: 0,
    recheepped: false,
    liked: false
};

const cheep5: CheepData = {
    id: 5,
    author: {
        handle: "sparrow",
        name: "Sparrow",
        picture: "https://www.revistaestilo.net/binrepository/trollface2_ES1218446_MG282389852.jpg"
    },
    dateCreated: new Date(),
    content: "Cita de una cita",
    quoteTarget: cheep2,
    commentCount: 0,
    likeCount: 0,
    recheepCount: 0,
    recheepped: false,
    liked: false
};

const CheepList: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        setTimeout(() =>
        {
            if(props.dataStatus.cheeps.length === 5)
            {
                return;
            }
            
            props.setDataStatus({
                loaded: true,
                cheeps: [
                    cheep5,
                    cheep4,
                    cheep3,
                    cheep2,
                    cheep0
                ]
            });
        },
        2000);
    },
    [ props ]);

    let content: React.ReactNode;
    if(props.dataStatus.loaded)
    {
        content = <>{props.dataStatus.cheeps.map((data, index) =>
        {
            return <Cheep key={`${index}-cheep`} data={data} />;
        })}</>;
    }
    else
    {
        content = <div className="loading-container">
            <Loading />
        </div>;
    }

    return <div className="cheep-list">
        {content}
    </div>;
};

export default CheepList;