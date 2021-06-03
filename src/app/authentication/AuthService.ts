import axios, { AxiosResponse } from 'axios';
import Configuration from "@/app/configuration/config.json";
import { setSessionCookie, unsetCookie } from '../utils/Cookie';

const URL = `http://${Configuration.server.host}:${Configuration.server.port}/auth/`;


export class AuthService {

    async login(username: string, password: string): Promise<AxiosResponse<any>> {
        const response = await axios.post(URL + 'login', {
            username,
            password
        })

        if (response.data.token) {
            if (Configuration.useAuthCookie) {
                setSessionCookie('user', JSON.stringify(response.data));
            } else {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        }

        return response.data;
    }

    register(username: string, email: string, password: string): Promise<AxiosResponse<any>> {
        return axios.post(URL + 'register', {
            username,
            email,
            password
        });
    }

    logout() {
        if (Configuration.useAuthCookie) {
            unsetCookie('user');
        }
        else {
            localStorage.removeItem('user');
        }
    }
}