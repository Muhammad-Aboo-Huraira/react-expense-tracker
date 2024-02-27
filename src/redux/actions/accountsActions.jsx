import { addDoc, collection, db } from "../../firebase/firebaseConfig";
import {
  addAccountsError,
  addAccountsSuccess,
  startAccountsLoading,
} from "../reducers/accountsReducer";

export const addAccounts = (accountName, amount, user_id, newAccounts) => {
  return async (dispatch) => {
    try {
      dispatch(startAccountsLoading());
      await addDoc(collection(db, "banks"), {
        user_id,
        accountName,
        amount: parseInt(amount),
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });

      dispatch(
        addAccountsSuccess([...newAccounts, { accountName, amount, user_id }])
      );
    } catch (error) {
      dispatch(addAccountsError(error.message));
    }
  };
};
