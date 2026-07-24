import api from "./api";


export const uploadProductImage = async(file)=>{


const formData = new FormData();


formData.append(
"image",
file
);


const res = await api.post(

"/upload/image",

formData

);


return res.data.url;

};