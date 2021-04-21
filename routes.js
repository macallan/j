const path = require('path')
const express = require('express')
const router = express.Router()

const admin = require('firebase-admin')

const serviceAccount = require('./secrets/journal-309718-firebase-adminsdk-3ls6r-5f5844407a.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

router.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

router.get('/api/macallan', async (req, res, next) => {
  const user = await db.collection('users').doc('macallan')
  const pages = await user.collection('pages').get()
  let response = [];

  pages.forEach(doc => {
    response.push(doc.data());
  });

  return res.send({ "pages": response });
})

router.get('/api/users/:user/pages/:page', async (req, res, next) => {
  const userRef = db.collection('users').doc(req.params.user)
  const pageRef = userRef.collection('pages').where('title', '==', req.params.page)
  const pages = await pageRef.get()
  if (pages.docs.length == 0) {
    console.log('No such document')
    const newPageRef = userRef.collection('pages').doc(req.params.page)
    const response = await newPageRef.set({
      title: req.params.page,
      bullets: []
    })
    console.log(response)
    return res.send(response.data())
  }

  pageData = pages.docs[0].data()
  return res.send(pageData);
})

router.post('/api/users/:user/pages/:page/new', async (req, res, next) => {

})

router.put('/api/users/:user/pages/:page/update', async (req, res, next) => {
  const userRef = db.collection('users').doc(req.params.user)
  const pages = await userRef.collection('pages').where('title', '==', req.params.page).get()
  if (pages.docs.length == 1) {
    const response = await userRef.collection('pages').doc(pages.docs[0].id).update({ bullets: req.body.bullets })
    res.send(response)
  } else {
    console.log('Could not find only 1 page')
    res.statusCode(400)
    res.send('Could not find only 1 page to update')
  }
})

module.exports = router
