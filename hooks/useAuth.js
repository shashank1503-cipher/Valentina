import React, {createContext,useMemo, useContext, useState, useEffect} from 'react';
import * as Google from 'expo-google-app-auth';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut
} from '@firebase/auth'
import {auth} from '../firebase';

const AuthContext = createContext({});

const config = {
    iosClientId: '311128380415-5dh787597b9j93t9klig0oj58t8tv619.apps.googleusercontent.com',
    androidClientId: '311128380415-1n97a7l9i4lbsbni46r469ohb9egra6d.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    permissions:['public_profile', 'email','gender','location'],
}

export const AuthProvider = ({children}) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    //to prevent the opening of splash screen for a split second b4 google auth
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(
        () => 
            onAuthStateChanged(auth, (user) => {
                if(user){
                    //logged in
                    setUser(user);
                }else{
                    //not logged in
                    setUser(null);
                }
                setLoadingInitial(false);
            }),
        []
    );

    const logout = () => {
        setLoading(true);

        signOut(auth)
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    const signInWithGoogle = async () => {
        setLoading(true);

        await Google.logInAsync(config).then(async (logInResult) => {
            if(logInResult.type === 'success') {
                let domain = logInResult.user.email.split('@')[1];
                if(domain=='iiitkottayam.ac.in') {
                    //login
                    const {idToken, accessToken} =logInResult;
                    const credentials = GoogleAuthProvider.credential(idToken, accessToken);
                    await signInWithCredential(auth,credentials);
                    console.log('Successfully logged in!'); 
                }else{
                    console.log('Sign in using kottayam account only');     
                    return Promise.reject();                 
                }                
            }

            return Promise.reject();            
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    };

    //cached values to prevent wastage re-rendering 
    const memoedValue = useMemo(
        ()=> ({
            user,
            loading,
            error,
            signInWithGoogle,
            logout,
        }),
        [user, loading, error]
        //re-renders only if user, loading or error state changes
    )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial&&children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
    return useContext(AuthContext);
}

