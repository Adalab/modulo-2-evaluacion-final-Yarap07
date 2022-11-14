"use strict";const favsSection=document.querySelector(".js_favorites"),charactersList=document.querySelector(".js_characters_list"),favsList=document.querySelector(".js_favorites_list"),forms=document.querySelectorAll(".js_form"),searchInput=document.querySelector(".js_search_input"),searchBtn=document.querySelector(".js_search_btn"),resetBtn=document.querySelector(".js_reset_btn");let characters=[],favoriteCharacters=[];function getAPIinfo(){fetch("https://www.breakingbadapi.com/api/characters",{method:"GET"}).then(e=>e.json()).then(e=>{characters=e,getFromLocalStorage(),paintCharacterList(characters)})}function renderCard(e){const t=document.createElement("li");t.classList.add("characters__list_item");const a=document.createElement("article");a.classList.add("js_card"),a.classList.add("characters__card"),a.setAttribute("id",e.char_id),a.setAttribute("data-id",e.char_id);const r=document.createElement("div");r.setAttribute("style","background-image:url('"+e.img),r.classList.add("characters__img");const s=document.createElement("h2"),c=document.createTextNode(""+e.name);s.classList.add("characters__name"),s.appendChild(c);const n=document.createElement("h3"),i=document.createTextNode(""+e.status);return n.classList.add("characters__status"),n.appendChild(i),a.appendChild(r),a.appendChild(s),a.appendChild(n),t.appendChild(a),t}function paintCharacterList(e){if(charactersList.innerHTML="",0===favoriteCharacters.length){for(let t=0;t<e.length;t++)charactersList.appendChild(renderCard(e[t]));selectedCardListener()}else if(0!==favoriteCharacters.length){for(let t=0;t<e.length;t++)charactersList.appendChild(renderCard(e[t]));for(let e=0;e<favoriteCharacters.length;e++){const t=characters.find(t=>t.char_id===favoriteCharacters[e].char_id);document.getElementById(t.char_id).classList.add("selected")}selectedCardListener()}}function handleSearch(e){e.preventDefault();const t=searchInput.value.toLowerCase();paintCharacterList(characters.filter(e=>e.name.toLowerCase().includes(t)))}getAPIinfo(),searchBtn.addEventListener("click",handleSearch);for(const e of forms)e.addEventListener("submit",e=>{e.preventDefault()});function renderFavCard(e){const t=document.createElement("li"),a=document.createElement("article");a.classList.add("js_card"),a.classList.add("selected"),a.classList.add("favorites__card");const r=document.createElement("p"),s=document.createElement("i");s.classList.add("fa-solid"),s.classList.add("fa-xmark"),r.appendChild(s),r.classList.add("js_remove_fav"),r.classList.add("favorites__cross--remove"),r.setAttribute("data-id",e.char_id);const c=document.createElement("div");c.setAttribute("style","background-image:url('"+e.img),c.classList.add("favorites__img");const n=document.createElement("h2"),i=document.createTextNode(""+e.name);n.classList.add("favorites__name"),n.appendChild(i);const d=document.createElement("h3"),o=document.createTextNode(""+e.status);return d.classList.add("favorites__status"),d.appendChild(o),a.appendChild(r),a.appendChild(c),a.appendChild(n),a.appendChild(d),t.appendChild(a),t}function paintFavList(){favsList.innerHTML="",favsSection.classList.remove("collapsed");for(const e of favoriteCharacters)favsList.appendChild(renderFavCard(e));removeCardListener()}function handleSelection(e){const t=parseInt(e.currentTarget.dataset.id),a=characters.find(e=>e.char_id===t),r=favoriteCharacters.findIndex(e=>e.char_id===t);-1===r?(favoriteCharacters.push(a),paintFavList(),setInLocalStorage(favoriteCharacters),paintCharacterList(characters)):favoriteCharacters.length>1?(favoriteCharacters.splice(r,1),paintFavList(),setInLocalStorage(favoriteCharacters)):(favoriteCharacters.splice(r,1),favsSection.classList.add("collapsed"),localStorage.removeItem("Favorites"))}function selectedCardListener(){document.querySelectorAll(".js_card").forEach(e=>{e.addEventListener("click",handleSelection)})}function handleRemoveOne(e){const t=parseInt(e.currentTarget.dataset.id),a=favoriteCharacters.findIndex(e=>e.char_id===t);favoriteCharacters.length>1?(favoriteCharacters.splice(a,1),paintFavList(),setInLocalStorage(favoriteCharacters)):(favoriteCharacters.splice(a,1),favsSection.classList.add("collapsed"),localStorage.removeItem("Favorites"))}function handleRemoveAll(){favoriteCharacters=[],favsSection.classList.add("collapsed"),localStorage.removeItem("Favorites"),paintCharacterList(characters)}function removeCardListener(){document.querySelectorAll(".js_remove_fav").forEach(e=>{e.addEventListener("click",handleRemoveOne)})}function setInLocalStorage(e){localStorage.setItem("Favorites",JSON.stringify(e))}function getFromLocalStorage(){const e=JSON.parse(localStorage.getItem("Favorites"));null!==e&&(favoriteCharacters=e,paintFavList())}resetBtn.addEventListener("click",handleRemoveAll);