import { addDoc, collection, db, deleteDoc, getDocs, query, where } from "../../firebase/firebaseConfig";
import {
  addAccountsError,
  addAccountsSuccess,
  deleteAccountsError,
  deleteAccountsSuccess,
  startAccountsLoading,
} from "../reducers/accountsReducer";

export const addAccounts = (accountName, amount, user_id, newAccounts) => {
  return async (dispatch) => {
    try {
      dispatch(startAccountsLoading());
      const docRef = await addDoc(collection(db, "banks"), {
        user_id,
        accountName,
        amount: parseInt(amount),
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });

      const doc_id = docRef.id;

      dispatch(
        addAccountsSuccess([...newAccounts, { accountName, amount, user_id, doc_id }])
      );
    } catch (error) {
      dispatch(addAccountsError(error.message));
    }
  };
};

export const deleteAccount = (accountName, userId, newAccounts) => {
  return async (dispatch) => {
    try {
      dispatch(startAccountsLoading());
      
      const accountsRef = collection(db, "banks");

      const q = query(
        accountsRef,
        where("accountName", "==", accountName),
        where("user_id", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      
      const updatedAccounts = newAccounts.filter(
        (item) => item.accountName !== accountName
      );

      dispatch(deleteAccountsSuccess(updatedAccounts));
    } catch (error) {
      dispatch(deleteAccountsError(error.message));
    }
  };
};

export const bankAccountExists = async (bankName, userId) => {
  const banksRef = collection(db, "banks");
  const q = query(
    banksRef,
    where("accountName", "==", bankName),
    where("user_id", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};