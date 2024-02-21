import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

// Reducers
import authReducer from "./reducers/authReducer";
import { firebaseReducer } from 'react-redux-firebase';

// ---------------------------------------------------------------------- //

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
});

export { rootPersistConfig, rootReducer };