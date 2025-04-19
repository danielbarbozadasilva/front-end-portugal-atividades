export interface TFormErrors {
    [key: string]: string;
};

export interface IFormData {
    token: string;
    email: string;
    newPassword: string;
    confirmPassword: string;
}

export interface IFormChangePasswordProps {
    submit: (data: {
        token: string;
        email: string;
        newPassword: string;
    }) => void;
}