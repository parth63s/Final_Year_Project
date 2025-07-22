import React, { Children, createContext, useState } from 'react';

export const OnlineStatusContext = createContext();

export const OnlineStatusProvider = ({children}) => {
    const [isOnline, setIsOnline] = useState(false);
    const toggleOnline = () => {
        setIsOnline(!isOnline);
    };

    return (
        <OnlineStatusContext.Provider value={{isOnline, toggleOnline}}>
            {children}
        </OnlineStatusContext.Provider>
    )
};
