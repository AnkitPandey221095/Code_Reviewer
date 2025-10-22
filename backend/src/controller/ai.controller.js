import aiservices from '../ai.servic.js'

export async function getreview(req,res){
    const code = req.body.code
    const language = req.body.language
    const target = req.body.target
    
    if(!code){
        return res.status(400).send({error:"code is required"})
    }
    try{
        const response = await aiservices(code,language,target)
        res.send(response)
    }catch(error){
        console.error("Error in getdata controller:",error)
        res.status(500).send({error:"Internal Server Error"})
    }
}