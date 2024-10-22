export const Routes = {
    /**
     * Route for:
     * - POST with RegisterPayload
     */
    register(){
        return "users/auth/register" as const;
    },
    /**
     * Route for:
     * - POST with LoginPayload
     */
    login(){
        return "users/auth/login" as const;
    },
    /**
     * - POST
     * Logout the signed in user
     */
    logout(){
        return "users/auth/logout" as const;
    }
}