const searchHashtag = /\s#[a-zA-Z0-9_]+|^#[a-zA-Z0-9_]+/g;

function parseText(text: string): Array<Token>
{
    if(text.length === 0)
    {
        return [];
    }
    
    let result = new Array<Token>();
    
    const found = [ ...text.matchAll(searchHashtag) ];

    let lastIndex = 0;
    for(let i = 0; i < found.length; ++i)
    {
        const element = found[i];
        if(element.index === undefined)
        {
            continue;
        }
        
        let start = element.index;
        let toAdd: string;

        if(element[0].charCodeAt(0) === 32)
        {
            start += 1;
            toAdd = element[0].substring(1);
        }
        else
        {
            toAdd = element[0];
        }

        result.push({
            type: TokenType.Plain,
            value: text.substring(lastIndex, start)
        });

        result.push({
            type: TokenType.Hashtag,
            value: toAdd
        });

        lastIndex = start + toAdd.length;
    }

    result.push({
        type: TokenType.Plain,
        value: text.substring(lastIndex)
    });

    return result;
}

export enum TokenType
{
    Plain,
    Hashtag
}
 
export interface Token
{
    type: TokenType;
    value: string;
}

export function tokensToHTML(tokens: Array<Token>): string
{
    let result = "";

    for(const token of tokens)
    {
        switch(token.type)
        {
        case TokenType.Plain:
            result += token.value;
            break;

        case TokenType.Hashtag:
            result += `<span class="hashtag">${token.value}</span>`;
            break;
        }
    }

    return result;
}

export default parseText;