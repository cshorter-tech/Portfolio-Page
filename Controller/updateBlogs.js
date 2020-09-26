const fs = require('fs');

// Reading files
const greetings = "hello"
const readFile = fs.readFile('./public/docs/blog.txt', (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data.toString())
})

// Creating files
const writeFile = fs.writeFile('./public/docs/blog1.txt', "Hello World", (err) => {
    if (err) {
        console.log(err)
    } console.log("File saved")
})

// Create & Remove directory
if (fs.existsSync('./controller/dud')) {
    fs.rmdir('./controller/dud', (err) => {
        if (err) {
            console.log(err)
        }
        console.log("folder deleted")
    })
} else {
    fs.mkdir('./controller/dud', (err) => {
        if (err) {
            console.log(err)
        }
        console.log("folder created")
    })
}

module.exports = {
    greetings,
    readFile,
    writeFile
};
