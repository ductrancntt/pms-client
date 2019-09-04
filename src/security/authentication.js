import login from "@/api/login/login";

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

    getCurrentUser() {
        return getCurrentUser();
    },
    isAuthenticated() {
        return getToken() != undefined && getToken() != null;
    },
    async authenticate(username, password) {
        let response = await login(username, password);
        if (response && response.status == 200) {
            setToken(response.data.accessToken);
            return true;
        }
        return false;
    },
    logout() {
        removeToken();
        removeCurrentUser();
    }
}


