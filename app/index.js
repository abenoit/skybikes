import App from "./views/pages/App";
import { createStore } from "redux";
import { rentalReducer } from "./reducers/rental.reducer";

const store = createStore(rentalReducer);

new App(store).render();
