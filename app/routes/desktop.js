/*
 * GET desktop page.
 */
module.exports = function(app) {

    app.get('/desktop', function(req, res){
        
        var requirejs = require('requirejs');
        requirejs.config({nodeRequire: require});

        var common = requirejs('./app/public/src/js/custom/common.js');

        var name = require("../../package").name;
        
        res.render('desktop', { title : name, stage : common.stage });
    });
    
};