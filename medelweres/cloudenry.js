let cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: process.env.cloudname,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})


async function aploudtoCloud(img) {
    try {
        let data = await cloudinary.Uploader.upload(img, {
            resource_type: "auto"
        })
        return data
    } catch (error) {
        return error
    }
}
async function DeletCloud(imgId) {
    try {
        let data = await cloudinary.Uploader.distroy(imgId)
        return data
    } catch (error) {
        return error
    }
}
module.exports = {
    DeletCloud,aploudtoCloud
}