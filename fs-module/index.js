const fs = require('fs')
const promisefy = require('util').promisify;
const path = require('path')
//unlink
const removeFileAsync = (path) => {
  return fs.unlink(path, (err) => {
    if (err) throw err
    console.log('文件删除成功')
  })
}
// removeFileAsync(path.resolve(__dirname, 'test.txt'));

// stat
const state = (path) => {
  return fs.stat(path, (err, state) => {
    if (err) throw err
    console.log(`文件属性：` + JSON.stringify(state))
  })
}
// state(path.resolve(__dirname, 'test.txt'))

const rename = (oldName, newName) => {
  return fs.rename(path.resolve(oldName), newName, (err) => {
    if (err) throw err
    console.log('Rename success')
  })
}
// rename(path.resolve(__dirname, 'newName.txt'), path.resolve(__dirname, 'xixi.txt'));

//read async 
const readFile = promisefy(fs.readFile)
//readFile(path.resolve(__dirname, 'xixi.txt')).then(res => console.log(res.toString()))

//read file with stream
const readFileWithStream = (path) => {
  return new Promise((resolve, reject) => {
    let data = ''
    const rs = fs.createReadStream(path);
    rs.on('data', (chunk) => {
      data += chunk;
    })
    rs.on('end', () => {
      console.log(data)
      resolve(data)
    })
    rs.on('error', (err) => {
      console.log(err)
      reject(err)
    })
  })

}
// readFileWithStream(path.resolve(__dirname, 'xixi.txt'))
//write file
const data = new Uint8Array(Buffer.from('Nodejs哈啊哈哈'))

const writeFileWithStream = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(__dirname, 'tes4t.txt'), data, (err) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      resolve('文件写入完成')
    })
  })
}
writeFileWithStream(data).then(res => {
  console.log(res)
})