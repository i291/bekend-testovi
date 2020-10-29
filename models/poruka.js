//sve vezano uz bazu ide u mapu models
const mongoose= require('mongoose')
//shema
//mongo baca validation error kada pokusam spremiti podatak koji ne odgovara validaciji 
  const porukaSchema = new mongoose.Schema({
      //validacija sheme
    ime:{
      type: String,
      required: true,
      minlength: 5 
    },
    prezime: {
      type: String,
      required: true,
      minlength: 5 

    },
    email:{
      type: String,
      required: true,
      minlength: 5 

    }


})
//radi nonoga id-a ruznog i onoga _v,overrajdat cemo metodu .tojson
//doc je kako inace vrati,a ret je kako mi zelimo da vrati
porukaSchema.set('toJSON',{
    transform: (doc,ret) => {
        ret.id= ret._id.toString()
        delete ret._id //nezelim id dami vrati
        delete ret.__v //nezelim da mi vrati v
        return ret


    }
})


//model kojeg moram exportat
module.exports = mongoose.model('Poruka',porukaSchema, 'poruke')