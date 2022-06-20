import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import parseText, { TokenType } from "../../../../parse_text";
import LinkParser from "../../../link_parser";

export interface Props
{
    content: string;
    response?: boolean;
}

const CheepContent: React.FunctionComponent<Props> = (props) =>
{
    const tokens = useMemo(() =>
    {
        return parseText(props.content);
    },
    [ props.content ]);

    return <>
        {tokens.map((token, index) =>
        {
            switch(token.type)
            {
            case TokenType.Plain:
                return <span key={`${index}-text`}>{token.value}</span>;

            case TokenType.Hashtag:
                if(props.response)
                {
                    return <span key={`${index}-hashtag`} className="hashtag">
                        {token.value}
                    </span>;
                }
                else
                {
                    return <Link key={`${index}-hashtag`} className="hashtag" to={`/hashtag/${token.value.substring(1)}`}>
                        {token.value}
                    </Link>;
                }

            case TokenType.URL:
                return <LinkParser
                    href={token.value}
                    className="link"
                />;
            }
        })}
    </>;
};

export default CheepContent;