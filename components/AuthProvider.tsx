import firebase from 'firebase';
import nookies from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';
import fire from '../config/firebaseClient';

const AuthContext = createContext<{ user: firebase.User | null, isLoading: boolean }>({
    user: null,
    isLoading: true,
});

 function AuthProvider({ children }: any) {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        return fire.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null);
                setIsLoading(false);
                nookies.set(undefined, 'token', '', { path: '/' });
            } else {
                const token = await user.getIdToken();
                setUser(user);
                setIsLoading(false);
                nookies.set(undefined, 'token', token, { path: '/' });
            }
        });
    }, []);

    // force refresh the token every 10 minutes
    useEffect(() => {
        const handle = setInterval(async () => {
            const user = fire.auth().currentUser;
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);

        // clean up setInterval
        return () => clearInterval(handle);
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;