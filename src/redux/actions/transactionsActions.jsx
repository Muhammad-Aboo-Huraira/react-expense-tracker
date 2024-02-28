import { addDoc, collection, db, serverTimestamp } from "../../firebase/firebaseConfig";
import { addTransactionsError, addTransactionsSuccess, startTransactionsLoading } from "../reducers/transactionsReducer";

export const addTransactions = (account, amount, user_id, newTransaction, category, transactionType) => {
    return async (dispatch) => {
      try {
        dispatch(startTransactionsLoading());
        const finalCategory = category === "" ? "Money Recieved" : category;
        const createdAt = new Date();
        const createdDate = createdAt.toLocaleDateString();
        const docRef = await addDoc(collection(db, "transactions"), {
          user_id,
          amount: parseInt(amount),
          transactionType,
          account,
          category : finalCategory,
          created_date: createdDate,
          created_time: serverTimestamp(),

        }).catch((error) => {
          console.error("Error adding document: ", error);
        });
  
        const doc_id = docRef.id;
  
        dispatch(
          addTransactionsSuccess([...newTransaction, { created_date: createdDate, created_time: serverTimestamp(), finalCategory, account, transactionType, amount: parseInt(amount), user_id, doc_id }])
        );
      } catch (error) {
        dispatch(addTransactionsError(error.message));
      }
    };
  };