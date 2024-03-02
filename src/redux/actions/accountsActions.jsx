import {
  addDoc,
  collection,
  db,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "../../firebase/firebaseConfig";
import {
  addAccountsError,
  addAccountsSuccess,
  deleteAccountsError,
  deleteAccountsSuccess,
  startAccountsLoading,
  updateAccountsSuccess,
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
        addAccountsSuccess([
          ...newAccounts,
          { accountName, amount, user_id, doc_id },
        ])
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

export const updateAccount = (account, newAmount, user_id, newAccounts) => {
  return async (dispatch) => {
    try {

      const q = query(
        collection(db, "banks"),
        where("user_id", "==", user_id),
        where("accountName", "==", account)
      );
      const querySnapshot = await getDocs(q);

      // Iterate through the query results (there should be only one result)
      querySnapshot.forEach(async (doc) => {
        console.log(doc.data()) 
        await updateDoc(doc.ref, {
          amount: parseInt(newAmount + doc.data().amount),
        });
      });

      // Update Redux store
      const updatedAccounts = newAccounts.map((item) => {
        if (item.accountName === account) {
          return { ...item, amount: parseInt(item.amount) + parseInt(newAmount) };
        }
        return item;
      });
      dispatch(updateAccountsSuccess(updatedAccounts));
    } catch (error) {
      // Handle error if needed
      console.error("Error updating account:", error);
      // Optionally dispatch an error action if needed
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
