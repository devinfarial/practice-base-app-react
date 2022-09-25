import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "../reducer";


const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));

export default store;