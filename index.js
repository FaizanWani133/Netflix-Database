const API_KEY = "3b2f840";
const newAPI = "c913a6365a30afe89c283fc63dc241bf"
var timer = 0;

document.querySelector("form").addEventListener("submit",getMovie)

async function getMovie() {
  event.preventDefault()
  // document.getElementById("inputBox").innerHTML=`<input value=${name}  oninput="processChange()" id="input" type="text" >`
  let movieName = document.getElementById("input").value;
  
 
  try {
    
    let result = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`
    );
    let result2 = await result.json();

    console.log(result2);
    displayData(result2.Search);
  } catch (e) {
    console.log(e);
    document.querySelector("#movieCard").innerHTML=""

    let div5 = document.createElement("div");
    div5.id = "oops";
    div5.innerHTML = `<h1>Oops. We haven't got that </h1><h2>Try searching for another movie</h2>`;
    document.querySelector("#movieCard").append(div5);
  }
}
function displayData(result) {
  clearInterval(timer)
  document.querySelector("#movieCard").innerHTML = "";
 
  
  result.map(function (elem) {
    if(elem.Poster==="N/A"){
      return;
    }
    var p4 = document.createElement("p");
    var p2 = document.createElement("p");
    var div = document.createElement("div");
    div.id = "hover-box";
    var img = document.createElement("img");
    img.src = elem.Poster;
    img.style.width = "100%";
    img.style.height = "100%";
    

    let p1 = document.createElement("p");
    p1.innerText = elem.Title;

    let p3 = document.createElement("p");
    p3.innerText = `Released :-  ${elem.Year}`;

    var div2 = document.createElement("div");
    div2.id = "movieCard2";
    div2.append(p1, p3, p2, p4);

    imdb();

    async function imdb() {
      try {
        let imdb = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${elem.imdbID}`
        );
        let rating = await imdb.json();
        console.log(rating);

        p4.innerText = `IMdb Rating :-  ${rating.imdbRating}`;

        p2.innerText = `Genre :-  ${rating.Genre}`;
        if (+rating.imdbRating >= 8.5) {
          var div3 = document.createElement("div");
          div3.id = "recommended";
          var div4 = document.createElement("div");
          div4.innerText = "TOP 10";
          div3.append(div4);

          div.append(div3);
        }
        div.append(img);
      } catch (error) {
        console.log(error);
      }
    }

    div.addEventListener("mouseenter", () => {
      div.append(div2);
    });
    
    div.addEventListener("mouseleave", () => {
      div2.remove();
    });
    document.querySelector("#movieCard").append(div);
  });

  // console.log(result)
}

function debounce(func, timeout = 500){
  
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const processChange = debounce(() => drop());

async function drop() {
  
  
  let name = document.getElementById("input").value;
  
  try {
    const list = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${name.trim()}`
    );
    const list2 = await list.json();
    
    console.log(list2);
    // document.getElementById("inputBox").innerHTML=`<input value=${name} oninput="processChange()" id="input" type="text" >`
    showDropdown(list2,name)
    console.log(name)
  } catch (error) {
    console.log(error);
  }
}


function showDropdown(obj,name){
  let data = obj.Search;
   removeAll();
 


  
  
  for(let i = 0; i<data.length ;i++){
    let div2 =document.createElement("div");
    div2.innerText=data[i].Title;
    div2.id="dropBtn"
    div2.addEventListener("click",function(){
      document.getElementById("input").value = data[i].Title;
      getMovie();
    })
    div2.addEventListener("mouseover",function(){
      document.getElementById("input").value = data[i].Title;
      
    })
    
    document.getElementById("appendhere").append(div2)
  }
  
  document.getElementById("appendhere").addEventListener("mouseout",function(){
    
    document.getElementById("input").value=name;
  })
}

function removeAll(){
  document.getElementById("appendhere").innerText=""
}
document.addEventListener("click",removeAll)
fet()
async function fet(){
    try{
        const val = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${newAPI}`)
        const val2  = await val.json();
        console.log(val2)
        let size = val2.results.length;
        let div = document.createElement("div");
        div.id="carousalDiv"
        let img = document.createElement("img");
        img.id="carosal"
        img.src = `https://image.tmdb.org/t/p/w500${val2.results[0].backdrop_path}`;
        div.append(img);
        document.querySelector("#movieCard").append(div)
        let timerId = setInterval(()=>{
          display(val2.results[Math.floor(Math.random() * size)]);
        },3000) 
        timer = timerId;
        document.getElementById("popular").addEventListener("click",function(){
          displayHot(val2.results,timerId)
        })
        


    }catch(err){

    }
}
function display(data){
  document.querySelector("#movieCard").innerText=""
  let div = document.createElement("div");
  div.id="carousalDiv"
        let img = document.createElement("img");
        img.id="carosal"
        img.src = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;
        div.append(img);
        document.querySelector("#movieCard").append(div)
    
}

function displayHot(data,id){
  clearInterval(id);
  document.getElementById("movieCard").innerText=""
  data.map((elem)=>{
    let div = document.createElement("div");
    
    let img = document.createElement("img");
    img.id = "popularImg"
    img.src = `https://image.tmdb.org/t/p/w500${elem.poster_path}`;
    // let title = document.createElement("p");
    // title.innerText=elem.title;
    div.append(img);
    document.getElementById("movieCard").append(div);

  })
}