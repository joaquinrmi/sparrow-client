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
    const [ link, href ] = useMemo(() =>
    {
        let link: string;
        let href: string;

        if(props.href.substring(0, SECURE.length) === SECURE)
        {
            link = props.href.substring(SECURE.length);
            href = props.href;
        }
        else if(props.href.substring(0, INSECURE.length) === INSECURE)
        {
            link = props.href.substring(INSECURE.length);
            href = props.href;
        }
        else
        {
            link = props.href;
            href = `https://${link}`;
        }

        return [ link, href ];
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
        return <a id={props.id} className={props.className} href={href}>
            {link}
        </a>;
    }
}

export default LinkParser;