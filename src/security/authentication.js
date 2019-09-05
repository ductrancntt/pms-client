import AccountService from "@/api/account";

const accessToken = 'access-token';
const currentUserKey = "current-user";

function getToken() {
    return localStorage.getItem(accessToken);
}

function setToken(token) {
    return localStorage.setItem(accessToken, token);
}

function removeToken() {
    localStorage.removeItem(accessToken);
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(currentUserKey));
}

function setCurrentUser(currentUser) {
    localStorage.setItem(currentUserKey, JSON.stringify(currentUser));
}

function removeCurrentUser() {
    localStorage.removeItem(currentUserKey);
}


/**
 * authentication logic.
 */
export default {
    async login(payload) {
        let response = await AccountService.authenticate(payload);
        if (response && response.status == 200) {
            setToken(response.data.accessToken);
            let currentAccount = await AccountService.getCurrentAccount();
            if (currentAccount.status == 200) {
                setCurrentUser(currentAccount.data);
                return true;
            } else {
                removeToken();
                removeCurrentUser();
                return false;
            }
        } else {
            return false;
        }
    },
    getCurrentUser() {
        return getCurrentUser();
    },
    isAuthenticated() {
        return getToken() != undefined && getToken() != null;
    },
    logout() {
        removeToken();
        removeCurrentUser();
    }
}


