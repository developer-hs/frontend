import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PERSIST,
  PAUSE,
  REGISTER,
} from "redux-persist";
import rootReducer from "./rootReducer";
import localStorage from "redux-persist/es/storage";
/* start redux-persist(reducer persist) */
const persistConfig = {
  key: "root", // key 값은 무엇이든 상관없음
  storage: localStorage, // 환경에 맞는 storage 설정
};

// AsyncStorage.getItem("root") // key 값이 root 로 저장된
// storage 를 찾을 수 있음

const persistedReducer = persistReducer(persistConfig, rootReducer);
// ↑ rootReducer 에 변화가 있을 때 마다
// persistConfig 에 설정한 대로 매번 저장하라
/* end redux-persist */

const store = configureStore({
  reducer: persistedReducer,
  // ↓ redux persist 와 redux toolkit 이 충돌되어 에러가 발생함
  // ↓ redux toolkit 이 action 을 만드는 방법이 있는데,
  // ↓ redux persist 와 action 의 종류가 다름
  // ↓ 그러므로 redux toolkit 에게 redux persist 의
  // ↓ 모든 action 들을 ignore(무시) 시킴
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PAUSE, REGISTER],
    },
  }),
});

/* start redux-persist(store persist) */
export const persistor = persistStore(store);
/* end redux-persist(store persist) */

export default store;
