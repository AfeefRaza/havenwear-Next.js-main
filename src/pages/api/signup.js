

import User from "../../../models/user"
import connectDb from "../../../middleware/mongoose"
var CryptoJS = require("crypto-js");
const handler = async (req, res)=>{
    if (req.method == 'POST') {
        
        
        let {name, email} = req.body
        var encpass = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY ).toString();
        let u = new User({name, email, password: encpass } );
        await u.save()
        
    res.status(200).json({success : "success"})
        
    } else {
        res.status(200).json({error: "this method is not allowed"})
    }
}


export default connectDb(handler)
  