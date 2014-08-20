require.config({
    baseUrl: "../js/",
    paths: {
      "jquery": "libs/jquery203",
      //"swiper" : "libs/swiper-2.1.min",
      //"scrollbar" : "libs/swiper.scrollbar-2.1",
    }/*,
    shim: {
       'swiper': {
　　　　　　deps: ['jquery'],
　　　　　　exports: 'swiper'
　　　　},
       'scrollbar': {
          deps: ['swiper'],
　　　　　　exports: 'scrollbar'
　　　　},
　　 }*/
  
});

require(['jquery'],function ($){

    $(function(){
      
      $("img").each(function(i, e) {
          //var imgHref = url.split("/").slice(2,-1).join("/") + "/";
          var imgSrc = $(e).attr("src");
          var dataUrl = $(".wrap").attr("data-url");
          $(e).attr("src",dataUrl+imgSrc);
      });
      
      $('<a href="javascript:history.back(-1);" class="btn-back"><span> </span></a>').insertBefore('.title'); 

      $(".wrap a").each(function(i, e) {
          //var imgHref = url.split("/").slice(2,-1).join("/") + "/";
          var href = $(e).attr("href");
          var dataUrl = $(".wrap").attr("data-url");
          var matchHtm = href.match(/\.(?:xlsx|xls|doc)/g);
          if(matchHtm == ".xls" || matchHtm == ".xlsx" || matchHtm == ".doc"){
            $(e).attr("href",dataUrl+href);
          }
          //$(e).attr("href",dataUrl+href);
      });               
                  
  })

       
});