require.config({
    baseUrl: "js/",
    paths: {
      "jquery": "libs/jquery203",
      "fastclick": "libs/fastclick",
    }/*,
  shim: {
    'idTabs': {
    deps: ['jquery'],
    exports: 'idTabs'
    }
  } */
});

require(['jquery','fastclick'],function ($,fastclick){

       fastclick.attach(document.body); 

	     $('.list-view li a').each(function(i, e) {
                  //var link = $(e).attr("href").slice(25,-2);
                  var linkName = $(e).attr("href").slice(33, -1);
                  //console.log(linkName)
                  $(e).attr("href","list/" + linkName + "/" + "list.html")
                  //console.log(a)
        })
});




