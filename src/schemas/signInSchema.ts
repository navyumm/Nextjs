import {z} from 'zod';


export const signInSchema = z.object({
    identifier : z.string(),                 // identifier == email == username
    password : z.string()
})