import axios from 'axios';
import { CreateLinkRequest, IPResponse } from './models';

const IP_URL = 'https://api.country.is';
const API_URL = 'http://localhost:5000';

export async function getIPInfo() {
    try {
    // const data: CreateUserResponse
    const { data } = await axios.get<IPResponse>(IP_URL);
    alert(data.ip)
    return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

export async function createLink(req: CreateLinkRequest) {
    try {
        const { data } = await axios.get<CreateLinkRequest>(API_URL);
        alert(data.name)
        return data;
    } catch(error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred.';
        }
    }
}