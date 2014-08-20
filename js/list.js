/*
 * 根据index.html 生成列表文件
 * mon 2014-8-11
 */
var http = require("http");
var request = require('request');
var fs = require("fs");
var path = require('path');
var iconv = require('iconv-lite');
var cheerio = require("cheerio");
var folder = require("./folder");
var url = require('url');

    var data;

    function render(){
        fs.readFile('index.html', 'utf-8', function(err, data) {  
            if (err) throw err;
            var $ = cheerio.load(data);
            var str = "",html = "";
            
            $(".list-view li").each(function(i, e) {
                var link = $(e).find("a").attr("href");
                var linkName = link.slice(33, -1);
                
                var dataHref = $(e).find("a").attr("data-href");
                   //getList(link);
                //console.log(pathname)
                folder.mkdir('list/' + linkName);//根据链接创建对应文件夹
                getLinks(dataHref,linkName);


            })
            //getLinks("http://www.yangjiang.gov.cn/ggfw/jy/xqzxxjy/xqjy/");
        })
    }

    //读出页面左边栏的链接
    function getLinks(link,linkName){  
      var data = "",
          strlistTitle = "",
          strlist = "",
          navs = "";

      var req = http.request(link, function(res){
          res.setEncoding('binary');
          res.on('data', function(chunk){
            data += chunk;
          });
   
          res.on('end', function(){
            var buf = new Buffer(data,'binary');
            var str = iconv.decode(buf, 'utf-8');
            var $ = cheerio.load(str);
            var title = $(".bg2 .cn2").text();
            var reg = /\.\.\//g;

            $("#navs .position1").each(function(j, e) {
                  strlist = "";//每次先清空前一次循环的数据
                  var listTitle = $(e).text();
                  
                  
                  //取得onclick函数参数第一位的跳转链接
                  var fun = $(e).find(".bg4").attr("onclick")
                  if(typeof(fun) !=="undefined"){
                    var argPath = fun.replace("; return false;","").replace("gotoDataList(","").split(",")[0].replace(reg,"").slice(1, -2)
                    //console.log(argPath)
                  }
                  //var getPath = fun;
                  //[0].replace("gotoDataList","")[0]
                  strlistTitle = '<h2 data-origin="http://www.yangjiang.gov.cn/ggfw/'+ linkName + "/" + argPath +'">'+listTitle+'</h2>\n';

                  $(e).next().find("a").each(function(k, el) {
                    //listHref = "";
                      var listhref = $(el).attr("href").replace(reg,"");
                      //console.log(listhref)
                      var listtext = $(el).text();
                      //console.log(listtext)
                      var pathname = url.parse(link).pathname.split("/")[3];
                      /*var pathlastname = url.parse(link).pathname.split("/")[4];
                      console.log(pathlastname)*/

                      //每页第一项有pathname
                      if($(el).parent().parent().parent().attr("id") == $(el).parents("div#navs").find('div').eq(0).attr("id")){

                        //每页第一项第一个改写链接
                        if($(el).attr("href") == "./"){
                          var firstlinkpathname = url.parse(link).pathname.split("/")[4];

                          strlist += '<li><a href="http://www.yangjiang.gov.cn/ggfw/' + linkName + "/" + pathname + "/" + firstlinkpathname +'/"><span>'+ listtext + '</span></a></li>\n';

                        } else {

                          strlist += '<li><a href="http://www.yangjiang.gov.cn/ggfw/' + linkName + "/" + pathname + "/" + listhref +'"><span>'+ listtext + '</span></a></li>\n';

                        }

                      } else {

                        strlist += '<li><a href="http://www.yangjiang.gov.cn/ggfw/' + linkName + "/" + listhref +'"><span>'+ listtext + '</span></a></li>\n';
                        
                      } 

                      //针对重点服务项改写链接
                      if(linkName.match("zdfw")){
                        var listhref = $(el).attr("href");
                        //console.log(listhref)
                        strlist = '<li><a href="'+ listhref + '"><span>' + listtext +'</span></a></li>\n';
                        //console.log(strlist)
                      }
                      //'<li><a href="http://www.yangjiang.gov.cn/ggfw/jy/xqzxxjy/xqjy/"><span>教育服务</span></a></li>\n' +
                  })

                 /*合并左栏导航*/
                 navs += linkName.match("zdfw") ? strlist : strlistTitle + "\n<ul class='clearfix'>\n" + strlist + "</ul>\n"
                 
                 /*放入html格式，写入文件*/
                  html = '<!DOCTYPE HTML>\n'
                          + '<html>\n'
                          + '<head>\n'
                          + '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />\n'
                          + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>\n'
                          + '<link rel="stylesheet" type="text/css" href="../../css/swiper.css">\n'
                          + '<link rel="stylesheet" type="text/css" href="../../css/index.css">\n'
                          + '<link rel="stylesheet" type="text/css" href="../../css/list.css">\n'
                          + '</head>\n'
                          + '<body style="overflow:hidden;">\n'
                          + '<div class="header"><b class="menu">菜单</b><h2 class="title">'
                          + title
                          + '</h2></div>'
                          + '<div class="wrap clearfix" style="margin-top:45px"><div class="left"><div class="wrapper"><div class="swiper-container swiper-container1"><div class="swiper-wrapper" style="margin-left:0"><div class="swiper-slide"><div class="slide-inner"><ul class="list-view">\n'
                          + navs
                          + '</ul></div></div></div><div class="swiper-scrollbar"></div></div></div></div>\n'
                          + '<div class="right"><div class="wrapper"><div class="swiper-container swiper-container2"><div class="swiper-wrapper" style="margin-left:0;width:100%"><div class="swiper-slide"><div class="slide-inner"></div></div></div><div class="swiper-scrollbar"></div></div></div></div></div>'
                          + '<script data-main="../../js/applist" src="../../js/libs/require.js"></script>\n'
                          + '</body>\n'
                          + '</html>';
            
                    //folder.mkdir('list/');
                    fs.writeFile( 'list/'+ linkName + '/' + 'list.html' , html , 'utf-8',function (err) {    
                           if (err) throw err;
                           //console.log(linkName+'数据已保存～');
                    })
                  
            })
        
          })
      })
        req.end();
    }

    
    

exports.render = render;









