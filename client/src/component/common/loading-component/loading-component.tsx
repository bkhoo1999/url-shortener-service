import React from "react";
import { LoadingComponentClass } from "./loading-component.classname";

const LoadingComponent = () => {
    const { LOADING_ICON, LOADING_ICON_PATH, LOADING_LOADER_ICON_PATH} = LoadingComponentClass

    return (
        <svg className={LOADING_ICON} viewBox="0 0 100 101" fill="none">
            <path d={LOADING_ICON_PATH} fill="currentColor"/><path d={LOADING_LOADER_ICON_PATH} fill="currentFill"/>
        </svg>
    )
};

export default (LoadingComponent);
