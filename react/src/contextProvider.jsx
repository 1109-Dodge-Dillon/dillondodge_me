import { createContext, useContext, useMemo, useState } from "react";
import json from "../public/dates.json"

const StateContext = createContext({
    user: null,
    token: null,
    dates: null,
    setUser: () => {},
    setToken: () => {},
    setDates: () => {}
});

export const ContextProvider = ({children}) =>
{
    const [user, _setUser] = useState(localStorage.getItem('USER'));
    const [token, _setToken] = useState(localStorage.getItem('API_TOKEN'));
    const [dates, _setDates] = useState({});

    const setToken = (token) =>
    {
        _setToken(token);
        if(token)
        {
            localStorage.setItem('API_TOKEN', token);
        }
        else
        {
            localStorage.removeItem('API_TOKEN');
        }
    }

    const setUser = (user) =>
    {
        _setToken(user);
        if(user)
        {
            localStorage.setItem('USER', user);
        }
        else
        {
            localStorage.removeItem('USER');
        }
    }

    const setDates = () =>
    {
        _setDates(json);
    }

    useMemo(() =>
    {
        setDates();
    }, []);

    return (
        <StateContext.Provider value={{
            user,
            token,
            dates,
            setUser,
            setToken,
            setDates
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
