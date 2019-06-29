/*
 * GET desktop page.
 */
module.exports = function(app) {

    app.get('/mobile', function(req, res){
        var name = require("../../package").name;
        var version = require("../../package").version;
        res.render('mobile', {title : name, version: version});
    });
    
};