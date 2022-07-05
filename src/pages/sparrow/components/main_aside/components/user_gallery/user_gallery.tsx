import React, { useContext, useEffect, useMemo } from "react";
import loadCheeps from "../../../../../../cheep/load_cheeps";
import SearchCheepsQuery from "../../../../../../search_cheep_query";
import StateContext from "../../../../state_context";
import GalleryImage, { PhotoData } from "../gallery_image";

import "./user_gallery.scss";

export interface Props
{
    userHandle: string;
}

const UserGallery: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    const listState = state.cheepLists.userGallery;

    const photos = useMemo(
        () =>
        {
            const photos = new Array<PhotoData>();

            if(listState.cheeps.length > 0 && listState.query.userHandle === props.userHandle)
            {
                for(let i = 0; i < listState.cheeps.length && photos.length < 7; ++i)
                {
                    const cheep = listState.cheeps[i];
                    
                    for(let j = 0; j < cheep.gallery.length; ++j)
                    {
                        photos.push(
                            {
                                url: cheep.gallery[j],
                                authorHandle: cheep.author.handle,
                                cheepId: cheep.id,
                                index: j + 1
                            }
                        );
                    }
                }
            }

            return photos;
        },
        [ listState.cheeps ]
    );

    useEffect(
        () =>
        {
            (async () =>
            {
                if(props.userHandle !== listState.query.userHandle)
                {
                    const query: SearchCheepsQuery =
                    {
                        userHandle: props.userHandle,
                        onlyGallery: true
                    };

                    const cheeps = await loadCheeps(query, true);

                    stateManager.loadCheepList("userGallery", query, cheeps.nextTime, cheeps.cheeps);
                }
            })();
        }
    );

    if(photos.length > 1 && listState.query.userHandle === props.userHandle)
    {
        let firstDivision: React.ReactNode;
        let secondDivision: React.ReactNode;

        switch(photos.length)
        {
        case 2:
            firstDivision = <GalleryImage data={photos[0]} />;

            secondDivision = <GalleryImage data={photos[1]} />;
            break;

        case 3:
            firstDivision = <GalleryImage data={photos[0]} />;

            secondDivision = <>
                <GalleryImage data={photos[1]} />
                <GalleryImage data={photos[2]} />
            </>;
            break;

        case 4:
            firstDivision = <>
                <GalleryImage data={photos[0]} />
                <GalleryImage data={photos[2]} />
            </>;

            secondDivision = <>
                <GalleryImage data={photos[1]} />
                <GalleryImage data={photos[3]} />
            </>;
            break;

        case 5:
            firstDivision = <>
                <GalleryImage data={photos[0]} />
                <GalleryImage data={photos[1]} />
            </>;

            secondDivision = <>
                <GalleryImage data={photos[2]} />
                <GalleryImage data={photos[3]} />
                <GalleryImage data={photos[4]} />
            </>;
            break;

        case 6:
            firstDivision = <>
                <GalleryImage data={photos[0]} />
                <GalleryImage data={photos[1]} />
                <GalleryImage data={photos[2]} />
            </>;

            secondDivision = <>
                <GalleryImage data={photos[3]} />
                <GalleryImage data={photos[4]} />
                <GalleryImage data={photos[5]} />
            </>;
            break;
        }

        let divisions: React.ReactNode;
        if(photos.length < 5)
        {
            divisions = <div className="gallery-container row">
                <div className="gallery-column">
                    {firstDivision}
                </div>

                <div className="gallery-column">
                    {secondDivision}
                </div>
            </div>;
        }
        else
        {
            divisions = <div className="gallery-container column">
                <div className="gallery-row">
                    {firstDivision}
                </div>

                <div className="gallery-row">
                    {secondDivision}
                </div>
            </div>
        }

        return <div className="user-gallery">
            {divisions}
        </div>;
    }
    else
    {
        return <></>;
    }
};

export default UserGallery;