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
  const userRef = db.collection('users').doc('macallan')
  const pageRef = userRef.collection('pages').where('title', '==', '2021-04-03')
  const pages = await pageRef.get()
  if (pages.docs.length == 0) {
    console.log('No such document')
    return res.send('Could not find page')
  }

  pageData = pages.docs[0].data()

  return res.send(pageData);
})


module.exports = router
