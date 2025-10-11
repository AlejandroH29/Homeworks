import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { logout } from "./auth/AuthSlice";
// Google Login Thunk
export const loginWithGoogle = () => {
    return async (dispatch) => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const { email, displayName, photoURL, uid } = result.user;
            dispatch(register({ email, displayName, photoURL, uid }));
        } catch (error) {
            dispatch(logout({ errorMessage: error.message }));
        }
    };
};

// Logout Thunk
export const logoutFirebase = () => {
    return async (dispatch) => {
        await signOut(auth);
        dispatch(logout());
    };
};
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { register } from "./auth/AuthSlice";

export const registerAuth = ( email, password ) => {
    return async ( dispatch ) => {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        if (response) {

            await updateProfile( auth.currentUser, {
                displayName: 'Jonathan',
                photoURL: ''
            })

            const { email } = response.user
            dispatch( register({ email }) )
        } else {
            throw new Error('login failed')
        }
    }
}