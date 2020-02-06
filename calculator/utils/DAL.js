const ds = require('../data/dataStore')

const getCmdDAL = inputCode => {
  const cmdObj = ds.commands.find(obj => obj.code === inputCode)
  return cmdObj
}

exports.getCmdDAL = getCmdDAL
