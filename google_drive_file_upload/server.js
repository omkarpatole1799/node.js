const express = require('express')
const fs = require('fs')
const app = express()

const { google } = require('googleapis')
const apiKeys = require('./authDetails.json')

const SCOPE = ['https://www.googleapis.com/auth/drive']

// provide access to google drive api
const auth = async () => {
    const jwtGoogleClient = new google.auth.JWT(
        apiKeys.client_email,
        null,
        apiKeys.private_key,
        SCOPE
    )
    await jwtGoogleClient.authorize()
    return jwtGoogleClient
}

// function to upload file to drive
const fileUpload = async (authGoogleClient) => {
    return new Promise((resolve, reject) => {
        const drive = google.drive({
            version: 'v3',
            auth: authGoogleClient,
        })
        let fileMetaData = {
            name: 'sample1.txt', // file name to be stored
            parents: ['1BpDGLGS_g2fTrrP95CPkzS2UOPOKA2qj'], // the string is folder name which can be found in google drive at the url when folder is opened
        }
        drive.files.create(
            {
                resource: fileMetaData,
                media: {
                    body: fs.createReadStream('sample.txt'), // actual file
                    mimeType: 'text/plain',
                },
                fields: 'id',
            },
            function (error, file) {
                if (error) {
                    return reject(error)
                } else {
                    console.log('file uploaded successfully')
                    resolve(file)
                    process.exit()
                }
            }
        )
    })
}

const performOperation = async () => {
    let authResponse = await auth()
    await fileUpload(authResponse)
}
performOperation()

app.listen(2550)
