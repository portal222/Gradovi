import React, { useState } from "react";

const GlobalContext = React.createContext({
    searchStringValue: '',
    setSearchStringFn: () => {},
    startDate: '',
    setStartDate: () => {},
    endDate: '',
    setEndDate: () => {}
});

export const GlobalProvider = ({ children }) => {
    const [searchStringValue, setSearchStringFn] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    return (
        <GlobalContext.Provider value={{
            searchStringValue,
            setSearchStringFn,
            startDate,
            setStartDate,
            endDate,
            setEndDate
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;