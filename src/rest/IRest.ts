/**
 * IRest.ts
 * @created 2024-10-29
 * @brief Interface for the REST client
 */

export interface IRest {
    /**
     * execute a GET request for the resource
     */
    get(resource:string):Promise<any>;

    /**
     * execute a DELETE request for the resource
     */
    delete(resource:string):Promise<any>;

    /**
     * execute a PUT request to the resource with a payload
     */
    put(resource:string, payload:any):Promise<any>;

    /**
     * execute a POST request to the resource with a payload
     */
    post(resource:string, payload:any):Promise<any>;

    /**
     * execute a PATCH request to the resource with a payload
     */
    patch(resource:string, payload:any):Promise<any>;
}