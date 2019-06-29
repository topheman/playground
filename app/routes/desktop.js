/*
 * GET desktop page.
 */
module.exports = function(app) {

    app.get('/desktop', function(req, res){
        
        var requirejs = require('requirejs');
        requirejs.config({nodeRequire: require});

        var common = requirejs('./app/public/src/js/custom/common.js');
        
        var mobileUrl = "http" + (app.get('host') === "topheman-playground.herokuapp.com" ? "s" : "") + "://"+app.get('host')+"/mobile";
        
        res.render('desktop', { title : "Playground 2.0", stage : common.stage });
    });
    
};