/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '@/lib/db/db';
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request){
    const data = await request.formData();

    let validatedData;
    try {
        validatedData = productSchema.parse({
            name: data.get('name'),
            description: data.get('description'),
            image: data.get('image'),
            price: Number(data.get('price')),
        });

} catch (error) {
    return  Response.json({message: error},{status:400} );
    }

    const filename = `${Date.now()}.${validatedData.image.name.split('.').slice(-1)}`;

    try {

        const buffer = Buffer.from(await validatedData.image.arrayBuffer());
        await writeFile(path.join(process.cwd(),"public/assets",filename),buffer);
        
        
    } catch (error) {
        return Response.json({message: "Failed to save the file to fs"},{status:500});
        
    }

    try {
        await db.insert(products).values({...validatedData, image: filename});
        
    } catch (error) {
        // todo: remove the file from fs

        return Response.json({message: "Failed to save the product to db"},{status:500});

        
    }
    return Response.json({message: "Product created"},{status:201});

}