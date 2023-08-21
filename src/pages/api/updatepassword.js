


import User from "../../../models/user"
import connectDb from "../../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken'

var CryptoJS = require("crypto-js");
const handler = async (req, res)=>{
    if (req.method == 'POST') {
        
        
        let token = req.body.token
        let user = jsonwebtoken.verify(token , process.env.JWT_TOKEN)
        let dbuser = await User.findOne({email:user.email})
        const bytes  = CryptoJS.AES.decrypt(dbuser.password, process.env.SECRET_KEY);
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);   
        
        if (decryptedPass == req.body.oldpassword && req.body.password == req.body.cpassword) {
            await User.findOneAndUpdate({email:dbuser.email},{password: CryptoJS.AES.encrypt(req.body.cpassword, process.env.SECRET_KEY ).toString()})
        }     
        
        
    res.status(200).json({success: true})
        
    } else {
        res.status(400).json({error: "this method is not allowed"})
    }
}


export default connectDb(handler)
  