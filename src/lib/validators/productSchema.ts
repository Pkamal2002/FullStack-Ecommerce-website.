import { z } from "zod";

export const productSchema = z.object({
    name: z.string({message: "Product name should be a string"}),
    price: z.number({message: "Product price should be a number"}),
    image: z.instanceof(File, {message: "Product image should be a file"}),
    description: z.string({message: "Product description should be a string"}),
    
})