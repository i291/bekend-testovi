const Poruka = require('../models/poruka')
const pocetnePoruke = [
    {
     
      ime: 'ivana',
      prezime: 'radalj',
      email: 'iradalj@pmfst.hr'
    },
    {
     
      ime: 'anaaaaa',
      prezime: 'daaaaaaa',
      email: 'da@pmfst.hr'
    },
    {
     
      ime: 'antonela',
      prezime: 'neeeeeeee',
      email: 'ne@pmfst.hr'
    }
  ]

  const porukeIzBaze = async () => {
    const poruke = await Poruka.find({})
    return poruke.map(p => p.toJSON())
  }
   
   
  module.exports = {
    pocetnePoruke, porukeIzBaze
  }