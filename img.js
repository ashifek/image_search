const accesskey = "rcZot0haTzKRSyjH181RkR-t6PQIULtf_uUvKt7H7xY"

const formEl = document.querySelector("form")
const inputEl=document.getElementById("search-input")
const searchResults=document.querySelector(".search-results")
const loadmore=document.getElementById("show-more-button")

let inputData="";
let page=1;
   async function searchImages(){
    inputData=inputEl.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;
    
    const response=await fetch(url);
    const data=await response.json();

    const results=data.results;

    if(page===1){
        searchResults.innerHTML="";
    }
     
    results.map((result) =>{

        const wrap=document.createElement("div");
        wrap.classList.add("search-result");

        const image=document.createElement("img")
        image.src=result.urls.small;
        image.alt=result.alt_description;

        const link=document.createElement("a");
        link.href=result.links.html;
        link.target="_blank";
        link.textContent=result.alt_description;



        wrap.appendChild(image);
        wrap.appendChild(link);
        searchResults.appendChild(wrap);

    });

        page++;
        if(page>1){
            loadmore.style.display="block";
        }
    }

    formEl.addEventListener("submit",(event)=>{
        event.preventDefault();
        page=1;
        searchImages();
    });

    loadmore.addEventListener("click",()=>{
        searchImages();
    });


   