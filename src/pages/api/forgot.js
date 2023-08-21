// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Forgot from "../../../models/Forgot"

export default function handler(req, res) {
    
        
    
    let token = 'asdas7887a92uihjahud903hjdfhjd'
    let forgot = new Forgot({
        email: req.body.email,
        token: token
    })
let email1 = `
Hi ,

There was a request to change your password!

If you did not make this request then please ignore this email.

Otherwise, please click this link to change your password: [link]`



    //user
    res.status(200).json({ success: true  })

    
  }
  