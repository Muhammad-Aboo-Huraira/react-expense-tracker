import {
  addDoc,
  auth,
  collection,
  db,
  query,
  where,
  getDocs,
  orderBy,
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
import { addTransactionsSuccess } from "../reducers/transactionsReducer";

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

      addDoc(collection(db, "banks"), {
        user_id: user.uid,
        accountName: "Cash",
        amount: 0,
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });

      addDoc(collection(db, "banks"), {
        user_id: user.uid,
        accountName: "Savings",
        amount: 0,
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
        const usersSnapshot = await getDocs(
          collection(db, "users"),
          where("user_id", "==", user.uid)
        );

        const accountsSnapshot = await getDocs(
          collection(db, "banks"),
          where("user_id", "==", user.uid)
        );
        const categoriesSnapshot = await getDocs(
          collection(db, "categories"),
          where("user_id", "==", user.uid)
        );
        const transactionsSnapshot = await getDocs(
          collection(db, "transactions"),
          where("user_id", "==", user.uid),
          orderBy("created_time", "asc")
        );
        const accountsData = [];
        accountsSnapshot.forEach((doc) => {
          accountsData.push({ ...doc.data(), doc_id: doc.id });
        });

        const categoriesData = [];
        categoriesSnapshot.forEach((doc) => {
          categoriesData.push({ ...doc.data(), doc_id: doc.id });
        });
        const transactionsData = [];
        transactionsSnapshot.forEach((doc) => {
          transactionsData.push({ ...doc.data(), doc_id: doc.id });
        });
        const usernames = [];
        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          const username = userData.username; // Assuming username field exists in the document
          if (username) {
            usernames.push(username);
          }
        });
        dispatch(signInSuccess({ ...user, username : usernames }));
        dispatch(addAccountsSuccess(accountsData));
        dispatch(addCategoriesSuccess(categoriesData));
        dispatch(addTransactionsSuccess(transactionsData));
        setStorageItem("user", JSON.stringify(user));
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
