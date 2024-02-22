import { addDoc, collection, db } from "../../firebase/firebaseConfig";
import { addAccountsError, addAccountsSuccess, startAccountsLoading } from "../reducers/accountsReducer";

export const addAccounts = (accountName, amount, user_id) => {
    return async (dispatch) => {
      try {
        dispatch(startAccountsLoading());
        addDoc(collection(db, "banks"), {
            user_id,
            accountName,
            amount : parseInt(amount)
          }).catch((error) => {
            console.error("Error adding document: ", error);
          });
  
        dispatch(addAccountsSuccess(accountName, amount, user_id));
      } catch (error) {
        dispatch(addAccountsError(error.message));
      }
    };
  };