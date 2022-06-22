import React from "react";
import { Link } from "react-router-dom";

export interface Props
{
    data: PhotoData;
}

const GalleryImage: React.FunctionComponent<Props> = (props) =>
{
    return <Link to={`/${props.data.authorHandle}/status/${props.data.cheepId}/photo/${props.data.index}`} className="gallery-image" style={{
        backgroundImage: `url(${props.data.url})`
    }}>
        <img src={props.data.url} />
    </Link>;
};

export interface PhotoData
{
    url: string;
    authorHandle: string;
    cheepId: number;
    index: number;
}

export default GalleryImage;