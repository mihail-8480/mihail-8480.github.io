import React from "react"
import {MayHaveChildren, withStyle, withStyleOverride} from "./base";

const Console = withStyle({
    background: 'black',
    color: 'white',
    fontFamily: 'Fantasque Sans Mono',
    height: '100vh',
    width: '100vw',
    display: 'block',
    padding: '0',
    margin: '0',
    whiteSpace: 'pre-wrap'
})

type ConsoleTextProps = {color? : string}
type ConsoleText = ConsoleTextProps&MayHaveChildren | string
const Text = withStyleOverride<ConsoleTextProps>({
    display: 'inline',
    padding: '0',
    margin: '0',
    whiteSpace: 'inherit'
}, ["color"])

function withConsoleColor(color : string): (children: string) => ConsoleText {
    return (children : string) => { return { color, children } }
}
const red = withConsoleColor('red')
const yellow = withConsoleColor('yellow')
const blue = withConsoleColor('blue')

const art = "\n" +
    "      ___     \n" +
    "     /__/\\    \n" +
    "    |  |::\\   \n" +
    "    |  |:|:\\  \n" +
    "  __|__|:|\\:\\ \n" +
    " /__/::::| \\:\\\n" +
    " \\  \\:\\~~\\__\\/\n" +
    "  \\  \\:\\      \n" +
    "   \\  \\:\\     \n" +
    "    \\  \\:\\    \n" +
    "     \\__\\/    \n"

const content = [
    art, '\n',
    "I am currently working on a ", yellow("Web Terminal"), ".\n",
    "It's still ", red("work in progress"), "!\n\n",
    "Currently it can render text and ", blue('colors'), '.'
]

function asConsoleContent(block: ConsoleText) {
    if (typeof block === "string") {
        block = { children: block }
    }
    return <Text {...block}/>
}

export default () => <Console>
    {content.map(asConsoleContent)}
</Console>