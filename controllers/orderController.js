const placeOrder = async (req,res)=>{
    try{

    }
    catch(err){
        console.log(err)
        res.status(400).json({msg: err.message, ok: false})
    }
}

export {
    placeOrder
}