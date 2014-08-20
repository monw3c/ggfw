/*
 * 根据列表爬内容，生成对应的内容html
 * mon 2014-7-17
 */
var http = require("http");
var request = require('request');
var fs = require("fs");
var iconv = require('iconv-lite');
var cheerio = require("cheerio");
var folder = require("./folder");

    function render(){
        //循环listContent文件夹下的文件夹
        fs.readdir('listContent/', function(err, files){
            files.forEach(function(tag){
              //一直向下去除mac下的.DS_Store文件夹
              if (tag !== ".DS_Store") {
               // if (tag !=".svn") {
               // 得到类似list/gysy,得到一级文件
                var link = 'listContent/' + tag ;
                //console.log(link);
                 fs.readdir(link ,function(err, f){
                   f.forEach(function(t){
                      if (t !== ".DS_Store") {
                            //得到类似list/gysy/list.html
                            var url = link + "/" + t;
                            var fileOutput = fs.readFileSync(url,'utf-8');
                            //console.log(fileOutput)
                            var $ = cheerio.load(fileOutput);
                            var str = "",html = "";
                            //var test = $("p").text();
                            //console.log(test);
                            $(".content a").each(function(i, e) {
                                var linkHref = $(e).attr("href");
                                var linkName = linkHref.split("/").pop();
                                var matchHtm = linkName.split(".").pop();//htm,html,aspx
                                //console.log(linkHref)
                                
                                //console.log(linkHref.split("/").slice(2,-1).join("/"));
                                if (matchHtm == "htm") {
                                  getContent(linkHref,tag,linkName);
                                }
                                
                                
                            })

                      }
                      
                    })

                 })
      
              }
            })

        })
        /*getContent('http://www.yangjiang.gov.cn/ggfw/jy/xqzxxjy/xqjy');
        var linkName = 'http://www.yangjiang.gov.cn/ggfw/jy/xqzxxjy/xqjy'.split("/");
        console.log(linkName)*/
    }
    
    function getContent(url,tag,linkName){
        var data = "";
        var req = http.request(url, function(res){

          res.setEncoding('binary');
          res.on('data', function(chunk){
              data += chunk;
          });

          res.on('end', function(){
              var buf = new Buffer(data,'binary');
              var str = iconv.decode(buf, 'utf-8');
              dealContentData(str);
              //console.log(str)
          });
        });

        req.end();

        function dealContentData(str){

            var $ = cheerio.load(str);
            var html = "",heads = "",contents = "";

            if($('table').hasClass('table1')){
              $(".table1").each(function(i, e) {

                      var contentTitle = $(e).find(".cn7_1").text();
                      var contentDate = $(e).find(".bg12").text();
                      var content = $(e).find(".cn12").html();
                      var imgHref = url.split("/").slice(2,-1).join("/") + "/";
                      //console.log(imgHref)
                      //var img = '<img src="http://' + imgHref + $(e).find("img").attr("src") + '">';
                      //var linkName = linkHref.split("/").pop();
                      //console.log(contentTitle);
                      heads +=  '<div class="header"><h2 class="title">'
                               + contentTitle
                               + '</h2></div>\n'

                      contents +='<div class="wrap clearfix" style="margin-top:45px" data-url="http://'
                                + imgHref
                                + '">'
                                + content
                                + '</div>\n'
                                
              })
                     html = '<!DOCTYPE HTML>\n'
                          + '<html>\n'
                          + '<head>\n'
                          + '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />\n'
                          + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>\n'
                          + '<link rel="stylesheet" type="text/css" href="../css/swiper.css">\n'
                          + '<link rel="stylesheet" type="text/css" href="../css/index.css">\n'
                          + '<link rel="stylesheet" type="text/css" href="../css/content.css">\n'
                          + '</head>\n'
                          + '<body>\n'
                          + heads
                          + contents
                          + '<script data-main="../js/appContents" src="../js/libs/require.js"></script>\n'
                          + '</body>\n'
                          + '</html>';
              //console.log(1)
            } else if ($(".WrapCnt").attr('id') == "article"){
              
              $(".WrapCnt").each(function(i, e) {
                      //heads = "";contents = "";
                      var contentTitle = $(e).find(".cn6").text();
                      var contentDate = $(e).find(".bg12").text();
                      var content = $(e).find(".Custom_UnionStyle").html();
                      var imgHref = url.split("/").slice(2,-1).join("/") + "/"
                      //var img = '<img src="http://' + imgHref + $(e).find("img").attr("src") + '">';
                      //var linkName = linkHref.split("/").pop();
                      //console.log(contentTitle);
                      heads +=  '<div class="header"><h2 class="title">'
                               + contentTitle
                               + '</h2></div>\n'

                      contents +='<div class="WrapCnt wrap clearfix" style="margin-top:45px" data-url="http://'
                                + imgHref
                                + '">'
                                + content
                                + '</div>\n'
                                
              })
                     html = '<!DOCTYPE HTML>\n'
                          + '<html>\n'
                          + '<head>\n'
                          + '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />\n'
                          + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>\n'
                          + '<link rel="stylesheet" type="text/css" href="../css/swiper.css">\n'
                          + '<link rel="stylesheet" type="text/css" href="../css/index.css">\n'
                          + '<link rel="stylesheet" type="text/css" href="../css/content.css">\n'
                          + '</head>\n'
                          + '<body>\n'
                          + heads
                          + contents
                          + '<script data-main="../js/appContents" src="../js/libs/require.js"></script>\n'
                          + '</body>\n'
                          + '</html>';

            }
                  /*放入html格式，写入文件*/
            /*html =  '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>\n'
                            + '<h2 class="list-title">'
                            + listTitle
                            + '</h2>\n'
                            + listContentTitles    */             
                            //+ listContents;
                
              
              
                          
            // 建listContent文件夹存放列表
            folder.mkdir( 'contents/');
            fs.writeFile( 'contents/' + linkName  , html , 'utf-8',function (err) {    
                   if (err) throw err;
                   console.log('数据已保存～');
                   //console.log(str)
            })         
        }
     }

     /*function returnInt(str){
          return str.match(/\d+/g);
     }*/

exports.render = render;

