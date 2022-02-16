

import multer from "multer";
import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../../prisma/prisma";



const route = nextConnect();



const upload = multer({
    storage: multer.diskStorage({
        destination: (req, _file, cb) => {
            const { id, title } = req.query;
            console.log('id: ', id, ' title: ', title);
            cb(null, `./public/users/${id}/${title}/`);
        },
        filename: (_req, file, cb) => cb(null, file.originalname),
    }),
})



route.use(upload.array('files'));



const uploadAllImages = async ({files, id, title, serviceId}: any) => {
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


    await uploadAllImages({
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