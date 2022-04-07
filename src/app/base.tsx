import React, {CSSProperties} from "react";

export type ChildProp = JSX.Element | string
export type ChildrenProp = ChildProp[] | ChildProp
export type MayHaveChildren = { children?: ChildrenProp }
export type MayHaveStyle = { style?: CSSProperties }

function createStyleOverrides<T>(overrides: string[], props: T & MayHaveStyle): MayHaveStyle {
    const shallowProps : any = {...props}
    const shallowStyle : any = {...props.style}
    for (const override of overrides) {
        delete shallowProps[override]
        shallowStyle[override] = (props as any)[override]
    }
    return {...shallowProps, ...{style: shallowStyle}}
}

function createStyleOverrideElement<T>(overrides: string[], tag? : (props: MayHaveChildren & MayHaveStyle) => JSX.Element) {
    tag ||= (props: MayHaveStyle & MayHaveChildren) => <div {...props}/>
    return (props : T) => tag(createStyleOverrides(overrides, props))
}

export function withStyle<T>(style? : CSSProperties, tag? : (props: MayHaveChildren & MayHaveStyle & T) => JSX.Element) {
    tag ||= (props: MayHaveStyle & MayHaveChildren) => <div {...props}/>
    return (props : MayHaveChildren & T) => tag({...props,style})
}

export function withStyleOverride<T>(style? : CSSProperties, overrides?: string[], tag? : (props: MayHaveChildren & MayHaveStyle) => JSX.Element) {
    overrides ||= []
    return withStyle(style, createStyleOverrideElement<T>(overrides, tag))
}
