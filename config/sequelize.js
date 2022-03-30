const database = require('./database.js')
const Sequelize = require('sequelize')
let promise

function buildSequelize(cfg){
  if(cfg){
    return new Sequelize(cfg.database, cfg.username, cfg.password,{
      host: cfg.host,
      port: cfg.port,
      pool: {
        min: 1,
        max: 15,
        acquire: 20000,
        idle: 10000
      },
      dialect: cfg.dialect
    })
  }
}

exports._instance = null

exports.init = async() => {
  const db_cfg = await database.read()
  exports._instance = buildSequelize(db_cfg)
  return exports._instance
}

exports.getInstance = () => {
  return !exports._instance ? exports.init() : Promise.resolve(exports._instance)
}

exports.verifiy = () => {
  const auth_loop = () => {
    return exports.init().then(db => {
      return db.authenticate().then(() => console.log("Successfully connected to Postgres"))
      .catch(e => {
        console.log("ERROR: ", e)
        return new Promise(resolve =>{
          setTimeout(() => resolve(auth_loop),3000)
        })
      })
    })
  }

  if(promise) {return promise}
  promise = auth_loop()
  
  return promise
}
