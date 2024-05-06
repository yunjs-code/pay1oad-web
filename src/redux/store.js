import { createStore } from "redux";
import rootReducer from "./reducers/authReducer";

const store = createStore(rootReducer);

export default store;
