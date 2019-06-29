/*
 * GET home page.
 */

module.exports = function(app) {

    app.get('/', function(req, res){
        var name = require("../../package").name;
        var version = require("../../package").version;
        res.render('index', { title : name, version: version });
    });
    
};