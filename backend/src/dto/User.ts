export interface CreateUserInput {
    name: string;
    projectIds?: [string];
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface UserLoginInput {
    email: string;
    password: string;
}