var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var suggestionSchema = new Schema({
    aName:{
        type: String,
        require: true,
    },
    suggestions: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('Suggestion', suggestionSchema)
