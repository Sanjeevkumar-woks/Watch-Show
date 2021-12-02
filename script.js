// Default URL
var url="https://api.jikan.moe/v3/search/anime?q=cat";
var display_div=document.getElementById("display");
var heading=document.getElementById("heading");

//search by the name entered
function search(){
  // featching the name
  var endKey=document.getElementById("search").value;
  //validating the name entered
  if(endKey==""){
    let alert=document.getElementById("alert");
    alert.innerHTML=`
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Enter Movie Name!</strong> 
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`
  }
 else{
   // Modifying the Url with the end-key entered
  let curl="https://api.jikan.moe/v3/search/anime?q="+endKey;
  //Feacthing the data
  fetch(curl)
  .then((response)=>response.json())
  .then(function(movies){ 
    //seting heading based on the search key
    document.getElementById("search").value="";
    heading.innerText=endKey.toUpperCase();
    renderAllMovies(movies.results)})
  .catch(()=>{
    //defalt recommanded movies 
    recommended()
    //Displaying alert to handle any errrroe in fetching
    let alert=document.getElementById("alert");
      alert.innerHTML=`
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Enter Valid Movie Name!</strong> 
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
  })
 }
}

//Displaying recommended movies as default
function recommended(){
  heading.innerText="Recommended Movies";
  let session=document.createElement("div");
  session.setAttribute("id","session");
  fetch(url)
  .then((response)=>response.json())
  .then(function(movies){ renderAllMovies(movies.results)})
}

//Displaying each movie 
function display_movies(movie){
 const card=document.createElement("div");
 card.setAttribute("class","card col-sm-2");
 card.setAttribute("id","card")
 card.innerHTML=`
 <img src=${movie.image_url} class="card-img-top" alt="movieimg">
 <div class="card-body">
   <h6 class="card-title">${movie.title}</h6>
   <p class="card-text"><span>Rated:${movie.rated}</span><br><span>Likes: <span id="likes">${movie.members}</span></span><br><span>Score:${movie.score}</span></p>
 <a href="${movie.url}"> <button id="watch" class="btn btn-primary btn-sm">Watch</button></a>
 </div>
 <div id="like">
 <button id="like-btn" class="btn btn-dark btn-sm" onClick="likes()"><i class="far fa-thumbs-up"></i>Like</button>
 </div>
 
 `;
display_div.append(card);
}

//Rendring all movies from the api
function renderAllMovies(movies){
  display_div.innerHTML="";
  movies.forEach( movie=> display_movies(movie));
}

//Incrimenting the likes through like button
function likes(){
  const like=document.getElementById("likes");
  let likenum=parseInt(like.innerText);
  like.innerText=likenum+1;
}

//Enter key press eventListner
var input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("search-btn").click();
  }
});

