/*
 * GET desktop page.
 */
module.exports = function(app) {

    app.get('/mobile', function(req, res){
        var name = require("../../package").name;
        res.render('mobile', {title : name});
    });
    
};