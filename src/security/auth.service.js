const accessToken = 'access-token';
const currentUserKey = "current-user";
const userAuthorities = "user-authorities";

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

function setUserAuthorities(authorities) {
    localStorage.setItem(userAuthorities, JSON.stringify(authorities));
}

function getUserAuthorities() {
    return JSON.parse(localStorage.getItem(userAuthorities));
}

function removeCurrentUser() {
    localStorage.removeItem(currentUserKey);
}

function hasAuthority(authorities) {
    if (!isAuthenticated() || !getUserAuthorities()) {
        return false;
    }

    for (let i = 0; i < authorities.length; i++) {
        if (getUserAuthorities().includes(authorities[i])) {
            return true;
        }
    }
    return false;
}

function isAuthenticated() {
    return getToken() != undefined && getToken() != null;
}


/**
 * authentication logic.
 */
let AuthService = {
    getToken: getToken,
    setToken: setToken,
    setCurrentUser: setCurrentUser,
    getCurrentUser: getCurrentUser,
    setUserAuthorities: setUserAuthorities,
    isAuthenticated: isAuthenticated,
    hasAuthority: hasAuthority,
    logout() {
        removeToken();
        removeCurrentUser();
    }
};
export default AuthService;


