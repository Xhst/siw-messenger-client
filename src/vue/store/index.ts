import { createStore } from 'vuex';
import { Auth } from "./modules/AuthModule";

export const store = createStore({
    modules: {
        Auth
    }
})