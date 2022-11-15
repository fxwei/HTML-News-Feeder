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
    block += "<div class=\"item\"><a href=\"" + item.link + "\"><h1>[" + t[0]  +":"+ t[1] + "/" + feed.title.replace('rthk.hk - 即時新聞: ','') + "] " + item.title + "</h1></a>";
    block += item.description + "</div>";
    return [block, T];
}

function addNews(data){
    console.log(data);
    newsSeq = [];
    data.items.forEach(item => document.getElementById('content').insertAdjacentHTML('beforeend', formatted(data.feed, item)[0]));
    return newsSeq;
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
/*
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}*/