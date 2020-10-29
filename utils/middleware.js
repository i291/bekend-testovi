const logger = require('./logger')
const zahtjevInfo = (req, res, next) => {
    console.log('Metoda:', req.method)
    console.log('Putanja:', req.path)
    console.log('Tijelo:', req.body)
    console.log('---')
    next()
  }

  const nepoznataRuta = (req, res) => {
    res.status(404).send({ error: 'nepostojeca ruta' })
  }
   
  //error hendler middlewear funkcije,primaju 4 argumenta, a ne 3 kao klasicni middlveri
const errorHandler = (err,req,res,next) =>{
      console.log("middleweare za pogreske")
      if(err.name= "CastError"){
          return res.status(400).send({error:"krivi fformat id parametra"})

      }else if (err.name === "MongoParseError"){
        return res.status(400).send({error:"krivi format podatka"})

      }
      next(err)
  }
  module.exports = {zahtjevInfo, nepoznataRuta, errorHandler}


