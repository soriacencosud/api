const fs = require('fs')

const readFile = (fileName) => {
  try {
    const file = fs.readFileSync(fileName)
    return JSON.parse(file)
  } catch (e) {
    console.log(e)
  }
}

const writeFile = (fileName, data) => {
  try {
    fs.writeFileSync(fileName, JSON.stringify(data))
    return true
  } catch (e) {
    console.log(e)
    return false
  } 
}


module.exports = {
  readFile,
  writeFile
}
