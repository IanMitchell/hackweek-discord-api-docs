import { Context, createContext, useContext } from "react";

export interface SubLinkContextInterface {
  active: string;
  setActive: (dispatchOptions: { type: string; payload?: unknown }) => void;
}

const context = createContext<SubLinkContextInterface>({
  active: "",
  setActive: () => {},
});

export default context;
