var API = "https://api.rss2json.com/v1/api.json?rss_url=";
var sources = ["https://rthk.hk/rthk/news/rss/c_expressnews_clocal.xml",
"https://rthk.hk/rthk/news/rss/c_expressnews_greaterchina.xml",
"https://rthk.hk/rthk/news/rss/c_expressnews_cinternational.xml",
"https://rthk.hk/rthk/news/rss/c_expressnews_cfinance.xml",
"https://rthk.hk/rthk/news/rss/c_expressnews_csport.xml"]

function formatted(feed,item){
    let block = "";
    let T = new Date(item.pubDate);
    let t = [("0"+(T.getHours()+8)%24).slice(-2),("0"+T.getMinutes()).slice(-2)];
    block += "<div class=\"item\"><button type=\"button\" class=\"collapsible\"><a href=\"" 
    + item.link + "\" target=\"_blank\"><h1>[" + t[0]  +":"+ t[1] + "/"
    + feed.title.replace('rthk.hk - 即時新聞: ','') + "]</a> " + item.title
    + "</h1></button><div class=\"content\"><p>" + item.description + "</p></div></div>";
    return {time:T, news:block};
}

newsSeq = [];

function addNews(data){
    data.items.forEach(item => newsSeq.push(formatted(data.feed, item)));
}

sources.forEach(s => {
    $.ajax({
        type: 'GET',
        url: API + s,
        dataType: 'jsonp',
        success: function (data) { 
            console.log(data);
            addNews(data);
        }
    });
});

$( document ).ajaxStop(function() {
  newsSeq.sort(function (a, b) {
    return b.time-a.time;
  });
  for(let n of newsSeq){
    document.getElementById('show').insertAdjacentHTML('beforeend', n.news);
  }
  
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
})
