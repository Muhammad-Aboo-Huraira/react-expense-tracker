import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

// Reducers
import authReducer from "./reducers/authReducer";
import { firebaseReducer } from 'react-redux-firebase';
import accountsReducer from "./reducers/accountsReducer";

// ---------------------------------------------------------------------- //

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["auth", "accounts"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  firebase: firebaseReducer,
});

export { rootPersistConfig, rootReducer };