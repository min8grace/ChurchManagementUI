export default function checkLoggedIn() {
    var token = getToken();
    return token !== null && token.length > 0;
}

const getToken = (): string | null => {
    return localStorage.getItem('logged_user');
};