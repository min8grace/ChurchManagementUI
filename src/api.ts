import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { IMember } from "./types";

const instance = axios.create({
    //baseURL: "http://churchmanagementapi-dev.eba-ihk4md9j.us-west-2.elasticbeanstalk.com/"
    baseURL: "https://localhost:44356/"
})

// Function to get the stored token from localStorage
const getToken = (): string | null => {
    return localStorage.getItem('logged_user');
};

// Set the Authorization header with the token for each request
let getHeaders = () => {
    const token = getToken();
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
        };
    }
    return {};
};

export const getMembers = () => {
    const headers = getHeaders();
    return instance.get("member/GetAll/", { headers }).then((response) => response.data);
};
export const getMember = ({ queryKey }: QueryFunctionContext) => {
    const [_, memberPk] = queryKey;
    const headers = getHeaders();
    if (memberPk === undefined) return {} as IMember;
    return instance.get(`member/${memberPk}`, { headers }).then((response) => response.data)
};

//[Route("{id}")]
export const getOfferingById = ({ queryKey }: QueryFunctionContext) => {
    const headers = getHeaders();
    return instance.get(`offering/${queryKey[1]}`, { headers }).then((response) => response.data)
};
//[Route("yymm/{year}/{month}")]
export const GetOfferingsByMonth = ({ queryKey }: QueryFunctionContext) => {
    const headers = getHeaders();
    return instance.get(`offering/yymm/${queryKey[1]}/${queryKey[2]}`, { headers }).then((response) => response.data)
};
//[Route("yy/{year}")]
export const GetOfferingsByYear = ({ queryKey }: QueryFunctionContext) => {
    const headers = getHeaders();
    return instance.get(`offering/yy/${queryKey[1]}`, { headers }).then((response) => response.data)
};
//[Route("member/{offeringNo}/{year}/{month}")]
export const GetOfferingsByOfferingNoAndMonth = ({ queryKey }: QueryFunctionContext) => {
    const headers = getHeaders();
    console.log(queryKey);
    return instance.get(`offering/member/${queryKey[1]}/${queryKey[2]}/${queryKey[3]}`, { headers }).then((response) => response.data)
};
//[Route("member/{offeringNo}/{year}")]
export const GetOfferingsByOfferingNoAndYear = ({ queryKey }: QueryFunctionContext) => {
    const headers = getHeaders();
    console.log(queryKey);
    return instance.get(`offering/member/${queryKey[1]}/${queryKey[2]}`, { headers }).then((response) => response.data)
};
//[Route("member_period/{offeringNo}/{startDate}/{endDate}")]
export const GetOfferingsByDateRange = ({ queryKey }: QueryFunctionContext) => {
    const headers = getHeaders();
    //console.log(queryKey);
    return instance.get(`offering/member_period/${queryKey[1]}/${queryKey[2]}/${queryKey[3]}`, { headers }).then((response) => response.data)
};

export const getMe = () => {
    const headers = getHeaders();
    // return instance.get(`Auth/GetMe`, { headers }).then((response) => response.data);
    const result = instance.get(`Auth/GetMe`, { headers }).then((response) => {
        //console.log("getMe", response.data);
        return response.data
    }).catch((error) => {
        // Handle errors here
        console.error(error);
        localStorage.removeItem("logged_user");
        localStorage.removeItem('offNum');
        throw error; // Rethrow the error to handle it in the calling code
    });
    return result;
};
export const logOut = () => instance.post(`users/log-out`).then((response) => response.data);

export interface IUsernameLoginVariables {
    username: string;
    password: string;
}
export interface IUsernameLoginSuccess {
    data?: string;
}
export interface IUsernameLoginError {
    data?: string;
    success: boolean;
    message: string;
}

export const usernameLogIn = ({ username, password }: IUsernameLoginVariables) => {
    const data = {
        username: username,
        password: password
    };
    return instance.post(`Auth/Login`, data).then((response) => {
        // Handle the response here if needed
        console.log("response.data.data", response.data.data);
        if (response.data.success) {
            localStorage.setItem('logged_user', response.data.data);
        }
        return response.data; // This will return the data from the API response
    })
        .catch((error) => {
            // Handle errors here
            console.error(error);
            throw error; // Rethrow the error to handle it in the calling code
        });
};


export interface ICreateOfferingVariable {
    offeringNumber: number;
    offMethod: number;
    offType: number;
    description: string;
    amount: number;
    postingDate: Date;
}

export const createOffering = (variable: ICreateOfferingVariable) => {
    const headers = getHeaders();
    const result = instance
        // .post(`Offering`, variable, { headers })
        .post(`Offering`, variable, {})
        .then((response) => response.data)
        .catch((error) => {
            // Handle errors here
            console.error("createOffering", error);
            throw error; // Rethrow the error to handle it in the calling code
        });
    return result;
};

export interface IUpdateOfferingVariable {
    id: number;
    offeringNumber: number;
    offMethod: number;
    offType: number;
    description: string;
    amount: number;
    postingDate: Date;
}
export const updateOffering = (variable: IUpdateOfferingVariable) => {
    const headers = getHeaders();
    console.log("variable", variable)
    const result = instance
        .put(`Offering`, variable, {})
        .then((response) => response.data)
        .catch((error) => {
            // Handle errors here
            console.error("updateOffering", error);
            throw error; // Rethrow the error to handle it in the calling code
        });
    return result;
};