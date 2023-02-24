const { Show } = require('./Show')
const { User } = require('./User')
const {db} = require('../db')

Show.belongsTo(User)
User.hasMany(Show)

module.exports = {Show, User}
