import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../types";

function useUser() {
    const { isLoading, data, isError } = useQuery<IUser>(["me"], getMe, {
        retry: false,
    });
    return {
        userLoading: isLoading,
        user: data,
        isLoggedIn: !isError,
    };
}

// const jwt = require('jsonwebtoken'); // Import jsonwebtoken librar
// const getTokenData = (token: string | null) => {
//     try {
//         // Decode the token and get the payload
//         const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key used for signing the token
//         return decoded;
//     } catch (error) {
//         // Handle invalid or expired tokens
//         console.error('Error decoding token:', error);
//         return null;
//     }
// };
// const token = localStorage.getItem('logged_user'); // Get the token from localStorage or wherever it is stored
// export const userData = getTokenData(token);