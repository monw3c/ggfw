require.config({
    baseUrl: "../../js/",
    paths: {
      "jquery": "libs/jquery203",
      "swiper" : "libs/swiper-2.1.min",
      "scrollbar" : "libs/swiper.scrollbar-2.1",
    },
    shim: {
       'swiper': {
　　　　　　deps: ['jquery'],
　　　　　　exports: 'swiper'
　　　　},
       'scrollbar': {
          deps: ['swiper'],
　　　　　　exports: 'scrollbar'
　　　　},
　　 }
  
});

require(['jquery','swiper','scrollbar'],function ($,swiper,scrollbar){

    $(function(){
  

      function fixPagesHeight() {
        $('.wrapper').css({
          height: $(window).height()-41
        })
      }
      $(window).on('resize',function(){
        fixPagesHeight()
      })
      fixPagesHeight();

       var mySwiper = new Swiper('.swiper-container1', {
          scrollContainer:true,
          mousewheelControl : true,
          mode:'vertical',
          //Enable Scrollbar
          scrollbar: {
            container :'.swiper-scrollbar',
            hide: true,
            draggable: false  
          }
        })

       var mySwiper = new Swiper('.swiper-container2', {
                  scrollContainer:true,
                  mousewheelControl : true,
                  mode:'vertical',
                  //Enable Scrollbar
                  scrollbar: {
                    container :'.swiper-scrollbar',
                    hide: true,
                    draggable: false  
                  }
        })

       $(".left .swiper-wrapper,.left .swiper-slide,.right .swiper-wrapper,.right .swiper-slide ").css("width","100%");


       function reinitSwiper(swiper) {
            setTimeout(function () {
             swiper.reInit();
            }, 500);
       }

       function changeHref(){

            $(".content li a").each(function(i, e) {
                var lasthref = $(this).attr("href").split("/").pop();
                $(this).attr("href","../../contents/" + lasthref);
            });
       }

       if(window.location.href.match("zdfw")){
        $(".list-view").prepend('<li><a href="http://www.yangjiang.gov.cn/ggfw/jy/xqzxxjy/xqjy/"><span>教育服务</span></a></li>\n');
       }

       function loadData(){

             var link = $('.list-view li a').eq(0).attr("href").split("/")[6];
             var path = $('.list-view li a').eq(0).attr("href").split("/")[4];
             $(".right .slide-inner").load("../../listContent/" + path + "/" + link + ".html",function(){
                    
                    reinitSwiper(mySwiper) 
                    changeHref()
             })
       }
       loadData()


       $('.list-view li a').on('click',function(event) {
            event.preventDefault();
            //$(".title").text($(".list-title").text());
            $(".right .slide-inner").empty();
            reinitSwiper(mySwiper)
            var link = $(this).attr("href").split("/")[6];
            //console.log(link)
            var path = $(this).attr("href").split("/")[4];
            $(".right .slide-inner").hide().load("../../listContent/" + path + "/" + link + ".html",function(){
              
              reinitSwiper(mySwiper) 
              changeHref()
            })
            
        })

       $(".menu").on('click',function(event) {
           $(".right .slide-inner").empty();
           $( ".left" ).show().animate({
              //opacity: 1,
              width: 80+"%",
              marginLeft : 0
            }, 100, "linear", function() {
              
              $( ".right" ).animate({
                //height: 200,
                 width: 20+"%"
              }, 100, "linear", function() {
                
              })
            })
        })

       $(".list-view li a").on('click',function(event) {
           $( ".left" ).animate({
              //opacity: 1,
              width: 0+"%",
              
            }, 100, "linear", function() {
              $( ".left" ).css("margin-left", "-20%");
              $( ".right" ).animate({
                //height: 200,
                 width: 100+"%"
              }, 100, "linear", function() {
                $(".right .slide-inner").show()
              })
            })
        })




  })

       
});