const ini = require('ini')
const path = require('path')
const fs = require('fs')
const util = require('util')
const read_file = util.promisify(fs.readFile)
const ini_file = 'database.ini'

exports.read = async () => {
  try{
    const default_config_path = path.join(process.env.APPDIR, ini_file)
    const config = read_file(default_config_path, 'utf8').then(txt => ini.decode(txt))
    return config
  }catch(e){
    console.log(e)
  }
}