import React from "react";

import "./gallery.scss";

export interface Props
{
    pictures: Array<string>;
}

const GALLERY_PATTERN = [
    [ 0 ],
    [ 0, 1 ],
    [ 0, 1, 3 ],
    [ 0, 1, 2, 3 ]
];

const Gallery: React.FunctionComponent<Props> = (props) =>
{
    const pictures: Array<React.ReactNode> = [ null, null, null, null ];
    for(let i = 0; i < props.pictures.length; ++i)
    {
        const index = GALLERY_PATTERN[props.pictures.length - 1][i];
        pictures[index] = <SinglePicture key={`${i}-picture`} picture={props.pictures[i]} />;
    }

    return <div className="gallery">
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
}

const SinglePicture: React.FunctionComponent<SinglePictureProps> = (props) =>
{
    return <div className="gallery-item-container" style={{
        backgroundImage: `url(${props.picture})`
    }}>
        <img src={props.picture} />
    </div>;
};

export default Gallery;