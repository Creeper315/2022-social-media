import io from "socket.io-client";
import { useEffect, useState } from "react";
const endpoint = "http://localhost:5000";
export const Socket = io(endpoint);

Socket.on("confirm connection", (e) => {
    // console.log("my socket id:", e);
});
