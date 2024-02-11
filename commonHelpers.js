import{i as a,S as p}from"./assets/vendor-5b791d57.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const c=document.querySelector(".form"),l=document.querySelector(".gallery"),d=document.querySelector("input"),u=document.querySelector(".loader");c.addEventListener("submit",i=>{i.preventDefault();const s="22866492-0a616de8c4fefaa29c0c168ad",n=d.value.trim();if(!n){a.warning({title:"",backgroundColor:"#FFA07A",message:"Please enter a search term!"});return}l.innerHTML="",f(),fetch(`https://pixabay.com/api/?key=${s}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(r=>{if(r.hits.length===0)a.error({title:"",backgroundColor:"#EF4040",message:"Sorry, there are no images matching your search query. Please try again!"});else{const e=r.hits.map(o=>`<li class="gallery-item">
                        <a href="${o.largeImageURL}">
                          <img class="gallery-image" src="${o.webformatURL}" alt="${o.tags}">
                        </a>
                        <p><b>Likes: </b>${o.likes}</p>
                        <p><b>Views: </b>${o.views}</p>
                        <p><b>Comments: </b>${o.comments}</p>
                        <p><b>Downloads: </b>${o.downloads}</p>
                      </li>`).join("");l.innerHTML=e;const t=new p(".gallery a",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",animation:250});t.on("show.simplelightbox"),t.refresh(),c.reset()}}).catch(r=>{console.error("Error fetching images:",r)}).finally(()=>{m()})});const f=()=>{u.style.display="block"},m=()=>{u.style.display="none"};
//# sourceMappingURL=commonHelpers.js.map
