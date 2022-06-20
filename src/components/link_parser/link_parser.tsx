import React, { useMemo } from "react";

export interface Props
{
    href: string;
    plain?: boolean;

    id?: string;
    className?: string;
}

const SECURE = "https://";
const INSECURE = "http://";

const LinkParser: React.FunctionComponent<Props> = (props) =>
{
    const link = useMemo(() =>
    {
        if(props.href.substring(0, SECURE.length) === SECURE)
        {
            return props.href.substring(SECURE.length);
        }
        else if(props.href.substring(0, INSECURE.length) === INSECURE)
        {
            return props.href.substring(INSECURE.length);
        }
        else
        {
            return props.href;
        }
    },
    [ props.href ]);

    if(props.plain)
    {
        return <span id={props.id} className={props.className}>
            {link}
        </span>;
    }
    else
    {
        return <a id={props.id} className={props.className} href={props.href}>
            {link}
        </a>;
    }
}

export default LinkParser;