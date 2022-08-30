import io from 'socket.io-client';
import { useEffect, useState } from 'react';
const endpoint = 'http://localhost:5000';

const Socket = () => {
    console.log('Socket connect');

    const socket = io(endpoint);
    // socket.on('pong', (e) => {
    //     console.log('print 111', e);
    // });

    useEffect(() => {
        // socket.on('connect', () => {
        //     // setIsConnected(true);
        // });
        // socket.on('disconnect', () => {
        //     // setIsConnected(false);
        // });
        // socket.on('pong', (e) => {
        //     console.log(e);
        //     // setLastPong(new Date().toISOString());
        // });
        // return () => {
        //     socket.off('connect');
        //     socket.off('disconnect');
        //     socket.off('pong');
        // };
    }, []);

    const sendPing = () => {
        socket.emit('ping', 'from client');
    };

    return (
        <div>
            <button onClick={sendPing}>send</button>
        </div>
    );
};

export default Socket;
