export interface User {
    _id: string;
    email: string;
    username: string;
    tel: string;
    _createdOn?: number;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
    username: string;
    email: string;
    password: string;
    tel: string;
}

export interface AuthResponse {
    _id: string;
    username: string;
    email: string;
    tel: string;
    accessToken: string;
}