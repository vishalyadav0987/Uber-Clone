import {createContext, useContext, useState} from 'react';

export const UserContext = createContext(null)

export const useUserContext = ()=>{
    return useContext(UserContext)
}

export const UserContextProvider = ({children})=>{
    const [user,setUser] = useState({});
    const [loding,setLoading] = useState(true);
    return (
        <UserContext.Provider value={{
            user,setUser,loding,setLoading
        }}
        >{children}</UserContext.Provider>
    )
}