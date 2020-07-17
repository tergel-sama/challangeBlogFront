import React from 'react';
export const ThemeContext = React.createContext({
    isDark:true,
    dispatch:()=>{}
})
export const ContentLayout = React.createContext({
    contentLayout:200,
    setContentLayout:()=>{}
})
export const UserContext = React.createContext({
    user:{},
    setUser:()=>{}
})
