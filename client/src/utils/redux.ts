import * as reactRedux from "react-redux";

declare module "react-redux" {
  type ArgumentTypes<F extends (...args) => any> = F extends (
    ...args: infer A
  ) => any
    ? A
    : never;

  export type ExposedAction<T extends Record<string, (...args) => any>> = {
    [P in keyof T]: (
      ...args: ArgumentTypes<T[P]>
    ) => ReturnType<ReturnType<T[P]>>;
  };
}
