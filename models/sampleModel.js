const model_name = "SampleModel"
const table_name = "sample_model"
const opts = {
  tableName: table_name
}

module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define(model_name, {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  }, opts)

  return model
}