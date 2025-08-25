import express from "express"
import { signup,login } from "../controllor/authController.js"
import User from "../models/User.js";
const router = express.Router();

router.post('/signup', signup);
router.post('/login',login);

router.get('/users', async (req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(e){
        
    }
})

export default router;