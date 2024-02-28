import {
  addDoc,
  collection,
  db,
  deleteDoc,
  getDocs,
  query,
  where,
} from "../../firebase/firebaseConfig";
import {
  addCategoriesError,
  addCategoriesSuccess,
  deleteCategoriesError,
  deleteCategoriesSuccess,
  startCategoriesLoading,
} from "../reducers/categoriesReducer";

export const addCategories = (categoryName, user_id, newCategories) => {
  return async (dispatch) => {
    try {
      dispatch(startCategoriesLoading());

      const exists = await categoryExists(categoryName, user_id);
      console.log(exists)
      if (exists) {
        dispatch(addCategoriesError("Category already exists"));
      }else {
        dispatch(addCategoriesError(""));
      const docRef = await addDoc(collection(db, "categories"), {
        user_id,
        categoryName,
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });

      const doc_id = docRef.id;

      dispatch(
        addCategoriesSuccess([...newCategories, { user_id, categoryName, doc_id }])
      );
      }
    } catch (error) {
      dispatch(addCategoriesError(error.message));
    }
  };
};

export const deleteCategory = (category, userId, newCategories) => {
  return async (dispatch) => {
    try {
      dispatch(startCategoriesLoading());
      
      const categoriesRef = collection(db, "categories");

      const q = query(
        categoriesRef,
        where("categoryName", "==", category),
        where("user_id", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      const updatedCategories = newCategories.filter(
        (item) => item.categoryName !== category
      );

      dispatch(deleteCategoriesSuccess(updatedCategories));
    } catch (error) {
      dispatch(deleteCategoriesError(error.message));
    }
  };
};

export const categoryExists = async (categoryName, userId) => {
  const categoriesRef = collection(db, "categories");
  const q = query(
    categoriesRef,
    where("categoryName", "==", categoryName),
    where("user_id", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};
