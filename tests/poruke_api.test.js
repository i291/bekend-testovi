const mongoose = require('mongoose')
const {TestScheduler} = require('jest')
const supertest = require('supertest')
const app=require('../app')
const api = supertest(app)
const Poruka = require('../models/poruka')
const pomocni=require('./pomocni')


	
beforeEach( async () => {
  await Poruka.deleteMany({})
  let objektPoruka = new Poruka(pomocni.pocetnePoruke[0])
  await objektPoruka.save()
  objektPoruka = new Poruka(pomocni.pocetnePoruke[1])
  await objektPoruka.save()
  objektPoruka = new Poruka(pomocni.pocetnePoruke[2])
  await objektPoruka.save()
})
test('poruke se vraćaju kao JSON', async () => {
    await api
      .get('/api/poruke')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
	
test('imamo 3 poruku', async () => {
  const odgovor = await api.get('/api/poruke')
 
  expect(odgovor.body).toHaveLength(pomocni.pocetnePoruke.length)
})
	
test('Prva poruka je o html-u', async () => {
  const odgovor = await api.get('/api/poruke')
 
  expect(odgovor.body[0].ime).toBe('ivana')
})
	
test('dohvaća sve poruke', async () => {
  const odgovor = await api.get('/api/poruke')
 
  expect(odgovor.body).toHaveLength(pomocni.pocetnePoruke.length)
})
	
test('specificni sadrzaj jedne poruke', async () => {
  const odgovor = await api.get('/api/poruke')
 
  const prezime = odgovor.body.map(p => p.prezime)
  expect(prezime).toContain('radalj')
})
   
test('(domaci-PUT)', async () => {
  const porukePocetak = await pomocni.porukeIzBaze()
  const porukaZaPromjenu = porukePocetak[0]

  const odgovor = await api
    .put(`/api/poruke/${porukaZaPromjenu.id}`)
    .expect(200)
  const porukeKraj = await pomocni.porukeIzBaze()
  expect(porukeKraj).toHaveLength(porukePocetak.length)


})



test('dodavanje poruke bez imena', async () => {
  const novaPoruka = {    
    prezime: 'radalj',
    email: 'radalj@gmail.com'
  }
  await api
  .post('/api/poruke')
  .send(novaPoruka)
  .expect(400)  
 
  const odgovor = await api.get('/api/poruke')  
  expect(odgovor.body).toHaveLength(pomocni.pocetnePoruke.length)  
 
})
test('dohvat specificne poruke', async () => {
  const porukePocetak = await pomocni.porukeIzBaze()
  const trazenaPoruka = porukePocetak[0]

  const odgovor = await api
  .get(`/api/poruke/${trazenaPoruka.id}`)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const jsonPoruka = JSON.parse(JSON.stringify(trazenaPoruka))
  expect(odgovor.body).toEqual(jsonPoruka)
})

test('ispravno brisanje poruke', async () => {
  const porukePocetak = await pomocni.porukeIzBaze()
  const porukaZaBrisanje = porukePocetak[0]

  const odgovor = await api
    .delete(`/api/poruke/${porukaZaBrisanje.id}`)
    .expect(204)
//ocekujem 1 manje
  const porukeKraj = await pomocni.porukeIzBaze()
  expect(porukeKraj).toHaveLength(porukePocetak.length - 1)
//ocekujem da nema imena kojeg sam obrisala
  const ime = porukeKraj.map(p => p.ime)
  expect(ime).not.toContain(porukaZaBrisanje.ime)

})

  afterAll(() => {
    mongoose.connection.close()
  })