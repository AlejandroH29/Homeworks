import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { logout } from "./auth/AuthSlice";
import { realTimeDb, ref, set, push, onValue } from "../../firebase/config";
import { setData } from "./firebaseSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { register } from "./auth/AuthSlice";
import { setLoading } from "./firebaseSlice";
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

export const fetchFirebaseData = () => (dispatch) =>{
    dispatch(setLoading());
    const dbref = ref(realTimeDb, "chat");
    onValue(dbref, (snapshot)=>{
        const data = snapshot.val();
        dispatch(setData(data ? Object.values(data): []))
    });
}

export const addDataToFirebase = (newData) => (dispatch) =>{
    const dbRef = ref(realTimeDb, "datos");
    const newEntry = push(dbRef);
    set(newEntry, newData);
}

export const addMessageToFirebase = (messageObj) => (dispatch) => {
    const dbRef = ref(realTimeDb, "chat");
    const newEntry = push(dbRef);
    set(newEntry, messageObj);
};