
/*

Multi Service Platform - Provider Create Service upload images API route
Created: Feb. 16, 2022
Last Updated: Feb. 16, 2022
Author: Tolentino, Francis James S.

*/



import { NextApiResponse } from "next";



import multer from "multer";



import nextConnect from "next-connect";



import prisma from "../../../../../prisma/prisma";



const route = nextConnect();


// multer upload configuration 
// set destination to dynamic path
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, _file, cb) => {
            const { id, title } = req.query;

            cb(null, `./public/users/${id}/${title}/`);
        },
        filename: (_req, file, cb) => cb(null, file.originalname),
    }),
})



// route middleware use of upload array
route.use(upload.array('files'));



// this function saves the images' metadata like name, path, etc. to database
const saveImagesToDatabase = async ({files, id, title, serviceId}: any) => {
    const data = [];
    
    for (let i=0; i < files.length; i++) {
        data.push({
            name: files[i].filename,
            path: `/users/${id}/${title}/${files[i].filename}`,
            serviceId: parseInt(serviceId, 10),
            userId: parseInt(id, 10)
        })    
    }

    await prisma.images.createMany({
        data: data
    }) 
}



route.post(async (req: any, res: NextApiResponse) => {
    const { id, title, serviceId } = req.query;


    await saveImagesToDatabase({
        files: req.files,
        id: id, 
        title: title, 
        serviceId: serviceId
    })


    res.json({ msg: 'image uploaded successfully', status: 100 });
});



export const config = {
    api: {
        bodyParser: false,
    }
}



export default route;