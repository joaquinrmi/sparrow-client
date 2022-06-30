import React, { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import "./gallery.scss";

export interface Props
{
    pictures: Array<string>;
    userHandle?: string;
    cheepId?: number;
    disableClick?: boolean;
}

const GALLERY_PATTERN = [
    [ 0 ],
    [ 0, 1 ],
    [ 0, 1, 3 ],
    [ 0, 1, 2, 3 ]
];

const Gallery: React.FunctionComponent<Props> = (props) =>
{
    const navigate = useNavigate();

    const pictures: Array<React.ReactNode> = [ null, null, null, null ];
    const pattern = GALLERY_PATTERN[props.pictures.length - 1];

    for(let i = 0; i < props.pictures.length; ++i)
    {
        const index = pattern[i];
        pictures[index] = <SinglePicture
            key={`${i}-picture`}
            picture={props.pictures[i]}
            onClick={(ev) =>
            {
                if(!props.disableClick && props.cheepId !== undefined && props.userHandle !== undefined)
                {
                    ev.preventDefault();
                    ev.stopPropagation();

                    navigate(`/${props.userHandle}/status/${props.cheepId}/photo/${index + 1}`);
                }
            }}
        />;
    }

    return <div className={`gallery ${props.disableClick ? "disabled" : ""}`}>
        <div className="gallery-vertical">
            <div className="gallery-horizontal">
                {pictures[0]}
                {pictures[2]}
            </div>

            {props.pictures.length > 1 ?
                <div className="gallery-horizontal">
                    {pictures[1]}
                    {pictures[3]}
                </div> :
                null
            }
        </div>
    </div>;
};

interface SinglePictureProps
{
    picture: string;
    onClick: MouseEventHandler<HTMLDivElement>;
}

const SinglePicture: React.FunctionComponent<SinglePictureProps> = (props) =>
{
    return <div
        className="gallery-item-container"
        style={{
            backgroundImage: `url(${props.picture})`
        }}
        onClick={props.onClick}
    >
        <img src={props.picture} />
    </div>;
};

export default Gallery;