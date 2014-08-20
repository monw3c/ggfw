/*
 * 入口文件
 * mon 2014-7-9
 */
var async = require("async");
var schedule = require("node-schedule");
var list = require("./js/list");
var listContent = require('./js/listContent');
var contents = require('./js/contents');
var reloadGBKcontent = require('./js/reloadGBKcontent');

list.render();
//listContent.render();
//contents.render();
//reloadGBKcontent.render();

/*var rule1 = new schedule.RecurrenceRule();
rule1.dayOfWeek = [0, new schedule.Range(1, 6)];
rule1.hour = 20;
rule1.minute = 46;
var i = schedule.scheduleJob(rule1, function(){
    category.render();
});


var rule2 = new schedule.RecurrenceRule();
rule2.dayOfWeek = [0, new schedule.Range(1, 6)];
rule2.hour = 20;
rule2.minute = 48;
var j = schedule.scheduleJob(rule2, function(){
    list.render();
});


var rule3 = new schedule.RecurrenceRule();
rule3.dayOfWeek = [0, new schedule.Range(1, 6)];
rule3.hour = 21;
rule3.minute = 30;
var k = schedule.scheduleJob(rule3, function(){
    content.render();
});*/

//category.render()
//list.render();
//content.render();

/*async.series([
    function(callback){
    //console.log("category")
    category.render();
    callback();

}, function(callback){
    //console.log("list")
    list.render();    
    callback();

}, function(callback){
    //console.log("content")
    content.render();
    callback();

}],function(error, results){

    if(error){
        console.error("错误:" + error);
    }
    //console.log(results);
});
*/