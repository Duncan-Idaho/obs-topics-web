declare module "textfit" {
    export type TextFitOptions = {
        alignVert?: boolean = false; // if true, textFit will align vertically using css tables
        alignHoriz?: boolean = false; // if true, textFit will set text-align: center
        multiLine?: boolean = false; // if true, textFit will not set white-space: no-wrap
        detectMultiLine?: boolean = true; // disable to turn off automatic multi-line sensing
        minFontSize?: number = 6;
        maxFontSize?: number = 80;
        reProcess?: boolean = true; // if true, textFit will re-process already-fit nodes. Set to 'false' for better performance
        widthOnly?: boolean = false; // if true, textFit will fit text to element width, regardless of text height
        alignVertWithFlexbox?: boolean = false; // if true, textFit will use flexbox for vertical alignment
    }
    export default function textFit(els: HTMLElement, options: TextFitOptions);
}