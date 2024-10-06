export interface User {
    id: string;
    
    email: string;
    password: string;

    firstName: string;
    lastName: string;
    gender: "Male" | "male" | "Female" | "female" | "Other" | "other";
    age: number;
    
    isAdmin: boolean;
}