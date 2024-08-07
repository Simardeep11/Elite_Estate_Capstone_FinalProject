import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

// Sign up function
export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        sendEmailVerification(auth.currentUser);
        return userCredential;
    } catch (error) {
        return error;
    }
}

// Sign in function
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        return error;
    }
}

// Sign out function
export const signOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        return error;
    }
}

// Sign in with Google function
export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        return userCredential;
    } catch (error) {
        return error;
    }
}

// Reset password function
export const resetPassword = async (email) => {
    try {
        const result = await sendPasswordResetEmail(auth, email);
        return result;
    } catch (error) {
        return error;
    }
}

// Check if email is verified
export const isVerified = () => {
    return auth.currentUser.emailVerified;
}
