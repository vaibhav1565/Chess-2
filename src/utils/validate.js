export const checkValidData = (email,password)=> {
    const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if (!isEmailValid) return "Email is not valid";
    if (!isPasswordValid) return "Password is not valid. It must be at least 8 characters long, with 1 uppercase letter, 1 lowercase letter, and 1 digit.";

    return null;
}