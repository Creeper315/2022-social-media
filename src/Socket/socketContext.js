import { useState, useEffect, createContext } from "react";
import { Socket } from "./socket";
export const SocketContext = createContext();

const SocketProvider = (props) => {
    // const val = "hi";
    return (
        <SocketContext.Provider value={{ Socket }}>
            {props.children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
