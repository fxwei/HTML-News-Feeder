var API = "https://api.rss2json.com/v1/api.json?rss_url=";

var APIkey = "uhvrh7g3aqgxmvoe3ehxnxl0r6rq8frx5wymysjn";

var source = ["clocal","greaterchina","cinternational","cfinance","csport"]


function formatted(feed,item, s){
    let block = "";
    let T = new Date(item.pubDate);
    let t = [`0${(T.getHours()+8)%24}`.slice(-2),`0${T.getMinutes()}`.slice(-2)];
    block += `<div class="item ${s}"><button type="button" class="collapsible ">
    <a href="${item.link}" target="_blank"><div class="summary">[${t[0]}:${t[1]}]
    </a>${item.title}</div><div class="category">${feed.title.replace('rthk.hk - 即時新聞: ','')}</div></button><div class="content"><p>${item.description}</p></div></div>`;
    return {time:T, news:block};
}

var newsSeq = [];

function addNews(data, s){
    data.items.forEach(item => newsSeq.push(formatted(data.feed, item, s)));
}

source.forEach(s => {
    $.ajax({
        type: 'GET',
        url: API + `https://rthk.hk/rthk/news/rss/c_expressnews_${s}.xml&api_key=${APIkey}`,
        dataType: 'jsonp',
        success: function (data) { 
            //console.log(data);
            addNews(data, s);
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
