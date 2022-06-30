import {v4 as uuidv4} from 'uuid';

class StorageService{
    // clientId for visitor
    getClientId() {
        let clientID = localStorage.getItem("client_id") || "";
        if (clientID === "") {
            let myuuid = uuidv4();
            localStorage.setItem("client_id", myuuid.toString())
        }
        return localStorage.getItem("client_id");
    }
    
    isLoggedIn() {
        let token = localStorage.getItem("token") || "";
        return !(token === "")
    }
    
    getToken() {
        return localStorage.getItem("token") || "";
    }

    saveToken(token: string) {
        localStorage.setItem('token', token)
    }
}

export var storageService = new StorageService();