import React from "react";

export interface Props
{
    href: string;
    id?: string;
    className?: string;
}

const SECURE = "https://";
const INSECURE = "http://";

const LinkParser: React.FunctionComponent<Props> = (props) =>
{
    let link = "";

    if(props.href.substring(0, SECURE.length) === SECURE)
    {
        link = props.href.substring(SECURE.length);
    }
    else if(props.href.substring(0, INSECURE.length) === INSECURE)
    {
        link = props.href.substring(INSECURE.length);
    }
    else
    {
        link = props.href;
    }

    return <a id={props.id} className={props.className} href={props.href}>
        {link}
    </a>
};

export default LinkParser;