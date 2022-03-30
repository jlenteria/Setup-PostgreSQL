const SampleModel = require('./sampleModel.js')

const sequelize = require('../config/sequelize.js')

const model_files = {
  SampleModel
}

let db_instance

exports.init = async () => {
  return sequelize.getInstance().then(async (db) => {
    const {Sequelize} = sequelize

    const models = {}
    Object.keys(model_files).forEach(k => {
      models[k] = model_files[k](db, Sequelize)
    })

    db_instance = {Sequelize, sequelize, models}
    return db_instance
  })
}

//call this when you want to create,update,delete and read data on database
exports.getInstance = () => {
  if(db_instance){return Promise.resolve(db_instance)}
  else 
    return exports.init()
}