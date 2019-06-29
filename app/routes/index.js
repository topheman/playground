/*
 * GET home page.
 */

module.exports = function(app) {

    app.get('/', function(req, res){

        var name = require("../../package").name;
        res.render('index', { title : name });
    });
    
};