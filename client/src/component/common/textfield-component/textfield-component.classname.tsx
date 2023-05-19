export enum TextfieldComponentClass {
    TEXTFIELD_LABEL = "mb-2 text-sm font-medium text-gray-900",
    TEXTFIELD_INPUT = "block w-full p-2.5 text-sm rounded-lg focus:outline-none disabled:opacity-10",
    TEXTFIELD_INPUT_DEFAULT = "bg-black-50 border border-black text-black-900 placeholder-black-700",
    TEXTFIELD_INPUT_ERROR = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700",
    TEXTFIELD_INPUT_SUCCESS = "bg-green-50 border border-green-500 text-green-900 placeholder-green-700",
    TEXTFIELD_CONTAINER = "relative",
    TEXTFIELD_LOADER = "absolute top-0 right-0 p-2.5 bg-transparent",
};

export const TextfieldInput = (error, value) => {
    const { TEXTFIELD_INPUT, TEXTFIELD_INPUT_ERROR, TEXTFIELD_INPUT_SUCCESS, TEXTFIELD_INPUT_DEFAULT } = TextfieldComponentClass;
    if (!!value) {
        return `${TEXTFIELD_INPUT} ${error ? TEXTFIELD_INPUT_ERROR : TEXTFIELD_INPUT_SUCCESS}`;
    }
    return `${TEXTFIELD_INPUT} ${TEXTFIELD_INPUT_DEFAULT}`;
};