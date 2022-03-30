const fs = require('fs')
const path = require('path')
const ini = require('ini')
const {exec} = require('child_process')
const ini_file = 'database.ini'
const default_database_ini = path.join(process.env.APPDIR, ini_file)
const db_config_json = path.join(process.env.APPDIR, 'config', 'config.json')

async function migrate () {
  const default_cfg = ini.parse(await fs.promises.readFile(default_database_ini, 'utf8'))

  //save ini file into json file
  await fs.promises.writeFile(db_config_json, JSON.stringify(default_cfg))

  await new Promise((resolve, reject) => {
    const proc = exec(
      'sequelize db:migrate',
      err => (err ? reject(err) : resolve())
      )
    // Forward stdout+stderr to this process
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
  }) 

}

module.exports = migrate()