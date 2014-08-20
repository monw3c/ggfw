/*
 * 根据列表爬内容列表，生成对应的列表html
 * mon 2014-7-17
 */
var http = require("http");
var request = require('request');
var fs = require("fs");
var iconv = require('iconv-lite');
var cheerio = require("cheerio");
var folder = require("./folder");

    function render(){
        //循环list文件夹下的文件夹
        fs.readdir('list/', function(err, files){
            files.forEach(function(tag){
              //一直向下去除mac下的.DS_Store文件夹
              if (tag !== ".DS_Store") {
               // if (tag !=".svn") {
               // 得到类似list/gysy,得到一级文件
                var link = 'list/' + tag ;
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
                            $(".list-view a").each(function(i, e) {
                                var linkHref = $(e).attr("href");
                                var linkName = linkHref.split("/")[6];
                                //console.log(linkHref);
                                getContent(linkHref,tag,linkName);
                                
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
            var listContents = "",listContentTitles = "",html = "",datas = "",strs = "";

            var listTitle = $(".position5").text();
            //console.log(listTitle)
            //console.log($(".table1 tr").length)
              //listContents = "";
              //判断不同结构
              //只有一排列表的
              if($(".table1 tr").eq(0).attr("id") == "did1"){

                $(".table1 tr").each(function(i,e){

                  $(e).find(".list01 a").each(function(i,el){
                      
                      var listContent = $(el).text();
                      //判断链接“./”或“../../../../”
                      var listContentHref = $(el).attr("href").split("/")[0] == "." ? url + $(el).attr("href").replace(/\.\//g,"") : "http://www.yangjiang.gov.cn/" + $(el).attr("href").replace(/\.\.\/\.\.\/\.\.\/\.\.\//g,"");

                      //var pages = returnInt($(el).parent().parent().parent().next().find('td.cn').text())[0];

                      listContents +=  '<li><a href="' + listContentHref + '">' + listContent + '</a></li>\n' ; 

                      /*if($(el).attr("href").split("/")[3] !== ".."){
                          var listContentHref = "http://www.yangjiang.gov.cn/ggfw/" + $(el).attr("href").replace(/\.\.\/+\.\.\/+\.\.\//g,"");
                          listContents +=  '<li><a href="' + listContentHref + '">' + listContent + '</a></li>\n' ; 
                          console.log(listContentHref)
                       }*/

                      //console.log(pages)
                      //内容只有一页的时候
                      /*if(pages == 1){

                        listContents +=  '<li><a href="' + url + listContentHref + '">' + listContent + '</a></li>\n' ; 
                        //console.log(pages)
                      } else {*/
                        //内容有多页
                        //console.log("不知"+pages)
                        //var pagesLink = url + "index_" + pages-1 + ".htm";
                        /*for (var i = 1; i <= pages; i++) {
                          //第一页的链接为"index.htm"
                           if(pages == 1) {
                            var datas = "";
                            listContents +=  '<li><a href="' + url + listContentHref + '">' + listContent + '</a></li>\n' ; 
                        //console.log(pages)
                            } else {
                             var pagesLink = url + "index_" + pages-1 + ".htm";
                             
                             console.log(pagesLink)
                             var req = http.request(pagesLink, function(res){
                                //var bufferHelper = new BufferHelper();
                                res.setEncoding('binary');
                                res.on('data', function(chunk){
                                    //bufferHelper.concat(chunk);
                                    datas += chunk;
                                });

                                res.on('end', function(){
                                    var buf = new Buffer(datas,'binary');
                                    //var buf = bufferHelper.toBuffer().toString();
                                    var strs = iconv.decode(buf, 'utf-8');
                                    var $ = cheerio.load(strs);

                                    if($(".table1 tr").eq(0).attr("id") == "did1"){

                                        $(".table1 tr").each(function(i,e){

                                          $(e).find(".list01 a").each(function(i,el){
                                              
                                              var listContent = $(el).text();
                                              var listContentHref = $(el).attr("href").replace(/\.\//g,"");

                                              listContents +=  '<li><a href="' + url + listContentHref + '">' + listContent + '</a></li>\n' ;
                                    //console.log(str)
                                          })
                                        })
                                    }
                                });
                            });

                            req.end();

                           } 
                        }*/
                        
                            
                      //}         
                      //console.log(listContents)
                  })

                })
                  /*放入html格式，写入文件*/
                  html =  '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>\n'
                            + '<div class="content">\n<h2 class="list-title">'
                            + listTitle
                            + '</h2>'
                            + listContents
                            + '</div>'

              } else {
                //几个分类项的
                $(".table1 .bg7").each(function(i,e){
                    listContents = "";
                    var listContentMoreHref = $(e).find(".position3 a").attr("href");
                    var listContentTitle = $(e).find(".bg8").text();
                    //listContents +=  '<p><a href="' + url + listContentHref + '">' + listContent + '</a></p>\n' ;          
                    //console.log(listContentMoreHref)
                    //var listContent = "";

                    $(e).next(".position4").find('li').each(function(i,el){

                      var listContentLiDate = $(el).find("span").text();
                      var listContentLiText = $(el).find("a").attr("title");
                      //var listContentLiHref = $(el).find("a").attr("href").replace(/\.\//g,"");
                      //console.log(listContentLiDate)
                      var listContentLiHref = $(el).find("a").attr("href").split("/")[0] == "." ? url + $(el).find("a").attr("href").replace(/\.\//g,"") : "http://www.yangjiang.gov.cn/ggfw/" + $(el).find("a").attr("href").replace(/\.\.\/\.\.\/\.\.\//g,"");


                      listContents += '<li><a href="' + listContentLiHref + '">' + listContentLiText + '</a></li>\n';
                      console.log(listContents)
                    })
                      
                  listContentTitles += '<h4>' + listContentTitle + '</h4>\n' + listContents;

                })
                  /*放入html格式，写入文件*/
                  html =  '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>\n'
                            + '<div class="content">\n<h2 class="list-title">'
                            + listTitle
                            + '</h2>\n'
                            + listContentTitles                 
                            + '</div>'
                
              }


              
                          
            // 建listContent文件夹存放列表
            folder.mkdir( 'listContent/' + tag);
            fs.writeFile( 'listContent/' + tag + '/' + linkName + '.html' , html , 'utf-8',function (err) {    
                   if (err) throw err;
                   //console.log('数据已保存～');
                   //console.log(str)
            })         
        }
     }

     function returnInt(str){
          return str.match(/\d+/g);
     }

exports.render = render;

