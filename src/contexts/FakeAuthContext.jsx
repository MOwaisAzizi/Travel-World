import {createContext, useContext, useReducer } from "react";

const AuthContext = createContext()

const initailState = {
    user:null,
    authunticated:false
}

function reducer(state,action){
    switch (action.type) {
       case 'login':return{...state,user:action.payload,authunticated:true}
       case 'logout':return{...state,user:null,authunticated:false}
       default: throw new Error('not valid switch case')
    }
   }

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

function AuthProvider({children}){
    const [{user,authunticated},dispatch] = useReducer(reducer,initailState)

    function login(email,password){
        if(FAKE_USER.email === email && FAKE_USER.password === password){
            dispatch({type:'login',payload:FAKE_USER})
        }
    }

    function logout(){
        dispatch({type:'logout'})
    }


    return <AuthContext.Provider value={{user,authunticated,login,logout}}>{children}</AuthContext.Provider>
}

function useAuth(){
    const context = useContext(AuthContext)
    if(context === undefined) throw new Error('context used outside the context parrent')
    
        return context
}

export {useAuth,AuthProvider}