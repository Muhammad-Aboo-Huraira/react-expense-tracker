import {
  addDoc,
  auth,
  collection,
  db,
  query,
  where,
  getDocs,
} from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  signUpSuccess,
  signUpError,
  startLoading,
  signInSuccess,
  signInError,
  resetError,
  resetSuccess,
} from "../reducers/authReducer";
import { setStorageItem } from "../../utils";
import { addAccountsSuccess } from "../reducers/accountsReducer";
import { addCategoriesSuccess } from "../reducers/categoriesReducer";

export const signUp = (username, email, password, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      addDoc(collection(db, "users"), {
        user_id: user.uid,
        email,
        username,
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });

      addDoc(collection(db, "accounts"), {
        user_id: user.uid,
        cash: 0,
        savings: 0,
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });

      addDoc(collection(db, "categories"), {
        user_id: user.uid,
        category: "Home",
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });

      addDoc(collection(db, "categories"), {
        user_id: user.uid,
        category: "Shopping",
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });

      addDoc(collection(db, "categories"), {
        user_id: user.uid,
        category: "Utility bills",
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });

      dispatch(signUpSuccess(user));
      navigate("/");
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
};

export const signIn = (email, password, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const isRegistered = await isEmailAlreadyRegistered(email);
      console.log(user);
      if (isRegistered) {
        const accountsSnapshot = await getDocs(
          collection(db, "banks"),
          where("user_id", "==", user.uid)
        );
        const categoriesSnapshot = await getDocs(
          collection(db, "categories"),
          where("user_id", "==", user.uid)
        );
        const accountsData = [];
        accountsSnapshot.forEach((doc) => {
          accountsData.push(doc.data());
        });

        const categoriesData = [];
        categoriesSnapshot.forEach((doc) => {
          categoriesData.push(doc.data());
        });
        console.log("Accounts: ", accountsData)
        console.log("Categories: ", categoriesData)
        dispatch(signInSuccess(user));
        dispatch(addAccountsSuccess(accountsData));
        dispatch(addCategoriesSuccess(categoriesData));
        console.log("Logged in successfully!");
        setStorageItem("user", JSON.stringify(user));
        // localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        dispatch(signInError("Email is not registered."));
      }
    } catch (error) {
      if (error.code === "auth/network-request-failed") {
        console.log(error.code);
        dispatch(signInError("Incorrect email or password."));
      } else {
        console.error("Login error:", error);
      }
    }
  };
};

export const passwordReset = (email) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());

      const isRegistered = await isEmailAlreadyRegistered(email);

      if (isRegistered) {
        await sendPasswordResetEmail(auth, email);
        dispatch(resetSuccess());
        console.log("Password reset email sent successfully.");
      } else {
        dispatch(resetError("Email is not registered."));
      }
    } catch (error) {
      dispatch(resetError(error.message));
    }
  };
};

export async function isEmailAlreadyRegistered(email) {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    return querySnapshot.size > 0;
  } catch (error) {
    console.error("Error checking email registration:", error.message);
    return false;
  }
}
