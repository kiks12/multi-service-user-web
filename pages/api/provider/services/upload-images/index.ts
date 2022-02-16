

import multer from "multer";
import nextConnect from "next-connect";



const route = nextConnect()



const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads/services/images/',
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
})



route.use(upload.array('files'));



route.post(async (req, res) => {
    // console.log(req.files);
    res.end({ msg: 'image uploaded successfully', status: 100 });
});



export const config = {
    api: {
        bodyParser: false,
    }
}



export default route;