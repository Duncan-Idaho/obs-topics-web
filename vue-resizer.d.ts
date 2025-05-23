declare module "vue-resizer" {
    import {Component} from "vue";
    export const DragRow: Component<{
        topPercent?: Number;
        width?: String;
        height?: String;
        sliderWidth?: Number;
        sliderColor?: String;
        sliderBgColor?: String;
        sliderHoverColor?: String;
        sliderBgHoverColor?: String;
    }>
    export const DragCol: Component<{
        leftPercent?: Number;
        width?: String;
        height?: String;
        sliderHeight?: Number;
        sliderColor?: String;
        sliderBgColor?: String;
        sliderHoverColor?: String;
        sliderBgHoverColor?: String;
    }>
}
