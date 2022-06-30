const REG = /(\s*#[a-zA-Z0-9_]+)|((https?:\/\/)?(www\.)?[a-zA-Z0-9\-_.]{1,256}\.[a-zA-Z0-9]{2,6}([#?/][a-zA-Z0-9#?=\[\],()/]*)?)/g;

const HASHTAG_START_REG = /\s*#/;

export enum TokenType
{
    Plain,
    Hashtag,
    URL
}
 
export interface Token
{
    type: TokenType;
    value: string;
}

function parseText(text: string): Array<Token>
{
    if(text.length === 0)
    {
        return [];
    }
    
    let result = new Array<Token>();
    
    const found = [ ...text.matchAll(REG) ];

    let lastIndex = 0;
    for(let i = 0; i < found.length; ++i)
    {
        const element = found[i];
        if(element.index === undefined)
        {
            continue;
        }
        
        let start = element.index;

        let type: TokenType;
        let toAdd: string;

        if(HASHTAG_START_REG.test(element[0]))
        {
            type = TokenType.Hashtag;

            if(element[0].charCodeAt(0) === 32)
            {
                start += 1;
                toAdd = element[0].substring(1);
            }
            else
            {
                toAdd = element[0];
            }
        }
        else
        {
            type = TokenType.URL;
            toAdd = element[0];
        }

        result.push(
            {
                type: TokenType.Plain,
                value: text.substring(lastIndex, start)
            }
        );

        result.push(
            {
                type: type,
                value: toAdd
            }
        );

        lastIndex = start + toAdd.length;
    }

    result.push(
        {
            type: TokenType.Plain,
            value: text.substring(lastIndex)
        }
    );

    return result;
}
export default parseText;