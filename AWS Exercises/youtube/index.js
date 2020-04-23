const fetch = require('node-fetch');

exports.handler = async (event, context, callback) => {
    // TODO implement
  const search = event.search;
  //console.log(searchKey);
  const res = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q='+search+'&type=video&key=AIzaSyA-nDg1OTapOEqY1UVdX5sVZW_4lWfSJ9k');
  const json = await res.json();
  
  // var title = "";
  // var videoId = "";
  
  // var response = { title: "", videoId: ""}
  // //console.log(json);
  // json.items.forEach(function(data, index){
  //   //console.log(index +" " + data.id.videoId + ", " + data.snippet.title);
    
  //   //response.title = data.snippet.title;
  //   //response.videoId = data.id.videoId;
  // });
  
  //return response;
  return json;
};
