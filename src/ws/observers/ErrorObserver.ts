export const errorHandler = {
    error: (body:{message:string, code:number}) => {
        console.error(`Received Error ${JSON.stringify(body)}`);
    }
}