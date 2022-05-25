import React, { useState, useEffect } from "react";
import Cheep from "../cheep/";
import Loading from "../loading";

import SearchCheepsQuery from "../../search_cheep_query";
import CheepData from "../../cheep_data";

import "./cheep_list.scss";

export interface Props
{
    arguments: SearchCheepsQuery;
}

const CheepList: React.FunctionComponent<Props> = (props) =>
{
    const [ dataStatus, setDataStatus ] = useState<{
        loaded: boolean,
        cheeps: Array<CheepData>
    }>({
        loaded: false,
        cheeps: []
    });

    useEffect(() =>
    {
        setTimeout(() =>
        {
            setDataStatus({
                loaded: true,
                cheeps: [
                    {
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
                    },
                    {
                        id: 2,
                        author: {
                            handle: "sparrow",
                            name: "Sparrow",
                            picture: "https://www.revistaestilo.net/binrepository/trollface2_ES1218446_MG282389852.jpg"
                        },
                        dateCreated: new Date(),
                        content: "Ejemplo de citado.",
                        gallery: [],
                        quoteTarget: {
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
                        },
                        commentCount: 0,
                        likeCount: 0,
                        recheepCount: 0,
                        recheepped: false,
                        liked: false
                    }
                ]
            });
        },
        2000);
    },
    []);

    let content: React.ReactNode;
    if(dataStatus.loaded)
    {
        content = <>{dataStatus.cheeps.map((data, index) =>
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