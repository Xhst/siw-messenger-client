import Configuration from "@/app/configuration/config.json";
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { AuthService } from '@/app/authentication/AuthService';
import { getCookie } from '@/app/utils/Cookie';
import { SiwMessenger } from "@/app/SiwMessenger";

export type LoginData = {
    username: string,
    password: string
}

export type RegisterData = {
    username: string,
    email: string,
    password: string
}

const storedUser = Configuration.useAuthCookie ? getCookie('user') : localStorage.getItem('user');

@Module({ namespaced: true })
export class Auth extends VuexModule {
    private authService = new AuthService();
    private loggedIn = storedUser !== null;
    private siwMessenger = SiwMessenger.instance;

    user = storedUser ? JSON.parse(storedUser) : null;


    @Action({ rawError: true })
    async login(data: LoginData): Promise<any> {
        try {
            const user = await this.authService.login(data.username, data.password);
            this.context.commit('loginSuccess', user);
            
            return Promise.resolve(user);
        } catch(error) {
            this.context.commit('loginFailure');
            const message = (error.response && error.response.data && error.response.data.message) 
                    || error.message || error.toString();

            return Promise.reject(message);
        }
    }

    @Action({ rawError: true })
    async register(data: RegisterData): Promise<any> {
        try {
            const response = await this.authService.register(data.username, data.email, data.password);
            this.context.commit('registerSuccess');

            this.siwMessenger.setMessagesInfo(['Ti sei registrato con successo.'], false);
            
            return Promise.resolve(response.data);
        } catch(error) {
            this.context.commit('registerFailure');

            const message = (error.response && error.response.data && error.response.data.message) 
                    || error.message || error.toString();

            const errors = error.response.data.errors;

            if (errors) {
                this.siwMessenger.setMessagesInfo(errors, true);
            }
            
            return Promise.reject(message);
        }
    }

    @Action
    signOut(): void {
        this.authService.logout();
        this.context.commit('logout');
    }

    @Mutation
    public loginSuccess(user: any): void {
        this.loggedIn = true;
        this.user = user;
    }

    @Mutation
    public loginFailure(): void {
        this.loggedIn = false;
        this.user = null;
    }

    @Mutation
    public logout(): void {
        this.loggedIn = false;
        this.user = null;
    }

    @Mutation
    public registerSuccess(): void {
        this.loggedIn = false;
    }

    @Mutation
    public registerFailure(): void {
        this.loggedIn = false;
    }

    get isLoggedIn(): boolean {
        return this.loggedIn;
    }
}