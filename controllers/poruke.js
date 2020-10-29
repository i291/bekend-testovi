const porukeRouter=require('express').Router()
const Poruka=require('../models/poruka')

  

porukeRouter.get('/',(req,res) => {
    Poruka.find({}).then(svePoruke => {
        res.json(svePoruke)
    })

})
porukeRouter.get('/:id',async(req,res,next) => {
    //za bazu
    const id=req.params.id
    const poruka=await Poruka.findById(id)
   
        //ako je ispravan format id-a
        if(poruka){
            res.json(poruka)
        }
        else{
            //da ne izbaci null jer podatak s tim idem koji se rzalikuje u zadnjoj znamenci postoji ali je null

            res.status(404).end()
        }
    
    //ako opce nie ispravan format id-a
    //u cijeloj app trazi onaj middlever sa 4 argumenta,skace na onu dole errorhendler funkciju





    // const id=Number(req.params.id) 
    // const poruka = poruke.find(p => p.id === id)
    // if(poruka){
    //     res.json(poruka)


    // }
    // else{
    //     res.status(404).end()
    // }

    


})
porukeRouter.delete('/:id',async(req,res,) => {
    const id=req.params.id
    await Poruka.findByIdAndRemove(id)
    res.status(204).end()

   

})

porukeRouter.post('/' ,async(req,res,next)=> {
    // const maxid = poruke.length > 0 
    // ? Math.max(...poruke.map(p => p.id))
    // : 0

    //podatak kojeg upisujemo na frontendu
    const podatak=req.body
    // if(!podatak.ime || !podatak.prezime || !podatak.email){
    //     return res.status(400),json({
    //         error:'nedostaje sadrzaj'
    //     })
    // }
    const poruka = new Poruka({
        ime:podatak.ime,
        prezime:podatak.prezime,
        email:podatak.email
    })
    // poruka.id=maxid+1

    // poruke=poruke.concat(poruka)
    // res.json(poruka)

    //logika rada s  bazom

    
    const spremljenaPoruka = await poruka.save()
    res.json(spremljenaPoruka)
    next(exception)

    
   

    // poruka.save().then(result => {
    //     console.log("podatak spremljen");
    //     res.json(result)
    // })
    // .catch(err => next(err))

})
porukeRouter.put('/:id',async(req,res,next) => {
    const id=req.params.id
    const podatak= req.body
    // podatak.id=Number(req.params.id)
    // poruke=poruke.map(p => p.id !== id ? p : podatak)
    // res.json(podatak)
    // res.status(204).end()

    //baza

    const poruka= {
        ime:podatak.ime,
        prezime:podatak.prezime,
        email:podatak.email
    }
    const novaporuka=await Poruka.findByIdAndUpdate(id,poruka,{new: true})
    res.json(novaporuka)

    // Poruka.findByIdAndUpdate(id,poruka,{new: true}).then(poruka => {
    //     res.json(poruka)
    // })
    // .catch(err => next(err))

   

})

module.exports = porukeRouter


