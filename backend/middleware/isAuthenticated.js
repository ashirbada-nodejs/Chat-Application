import  jwt  from "jsonwebtoken";


export const isAuthenticated = async (req,res,next)=>{
        try {
            const token = req.cookies.token;
            if(!token){
                return res.status(401).json({
                    message : "user not authenticated"
                })
            }
            //token verify
            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
            if(!decode){
                return res.status(401).json({message : "invalid token"})
            }
            req.id = decode.userId;
            next();
        } catch (error) {
            res.status(500).json({
                message : "internal server error",
                success : false
            })
        }
}