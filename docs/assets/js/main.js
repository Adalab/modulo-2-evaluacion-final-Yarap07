"use strict";const favsSection=document.querySelector(".js_favorites"),charactersList=document.querySelector(".js_characters_list"),favsList=document.querySelector(".js_favorites_list"),forms=document.querySelectorAll(".js_form"),searchInput=document.querySelector(".js_search_input"),searchBtn=document.querySelector(".js_search_btn"),resetBtn=document.querySelector(".js_reset_btn"),home=document.querySelector(".js_home"),header=document.querySelector(".js_header");let characters=[],favoriteCharacters=[],searchedCharacters=[];function getAPIinfo(){fetch("https://www.breakingbadapi.com/api/characters",{method:"GET"}).then(e=>e.json()).then(e=>{characters=e.map(e=>({char_id:e.char_id,img:e.img,name:e.name,occupation:e.occupation,status:e.status})),getFromLocalStorage(),paintCharacterList(characters)}).catch(e=>console.log(`¡Ups! Ha ocurrido un error ${e} al cargar los datos desde la API. Vuelva a intentarlo más tarde`))}function renderCard(e){const t=document.createElement("li");t.classList.add("characters__list_item");const a=document.createElement("article");a.classList.add("js_card"),a.classList.add("characters__card"),a.setAttribute("id",e.char_id),a.setAttribute("data-id",e.char_id);const r=document.createElement("div");r.setAttribute("style","background-image:url('"+e.img),r.classList.add("characters__img");const c=document.createElement("h2"),s=document.createTextNode(""+e.name);c.classList.add("characters__name"),c.appendChild(s);const n=document.createElement("ul");n.classList.add("characters__occupation_list");for(let t=0;t<e.occupation.length;t++){const a=document.createElement("li"),r=document.createTextNode(e.occupation[t]);a.classList.add("characters__occupation_list__item"),a.appendChild(r),n.appendChild(a)}const o=document.createElement("p"),d=document.createTextNode(""+e.status);return o.classList.add("characters__status"),o.appendChild(d),a.appendChild(r),a.appendChild(c),a.appendChild(n),a.appendChild(o),t.appendChild(a),t}function paintCharacterList(e){if(charactersList.innerHTML="",0===favoriteCharacters.length){for(let t=0;t<e.length;t++)charactersList.appendChild(renderCard(e[t]));selectedCardListener()}else if(0!==favoriteCharacters.length){for(let t=0;t<e.length;t++)charactersList.appendChild(renderCard(e[t]));for(let t=0;t<favoriteCharacters.length;t++){const a=e.find(e=>e.char_id===favoriteCharacters[t].char_id);if(void 0!==a){document.getElementById(a.char_id).classList.add("selected")}}selectedCardListener()}}function noFavoritesMessage(){const e=document.createElement("p"),t=document.createTextNode("Todavía no tienes ningún favorito seleccionado");e.classList.add("header__no_fav_text"),e.classList.add("js_no_fav_text"),e.appendChild(t),header.appendChild(e)}function searchErrorMessage(){const e=document.createElement("p"),t=document.createTextNode("El nombre introducido no existe. Introduzca un nombre válido, por favor");e.classList.add("header__error_text"),e.classList.add("js_error_text"),e.appendChild(t),header.appendChild(e)}function handleSearch(){const e=searchInput.value.toLowerCase(),t=/^[a-zA-Z]+$/.exec(e);searchedCharacters=characters.filter(e=>e.name.toLowerCase().includes(t[0])),checkSearch()}function checkSearch(){if(0===searchedCharacters.length){const e=document.querySelector(".js_no_fav_text");null!==e&&e.remove(),searchErrorMessage(),paintCharacterList(characters)}else{const e=document.querySelector(".js_error_text");null!==e&&(e.remove(),noFavoritesMessage()),paintCharacterList(searchedCharacters)}}function checkIfSearch(){0===searchedCharacters.length?paintCharacterList(characters):paintCharacterList(searchedCharacters)}getAPIinfo(),home.addEventListener("click",()=>{searchInput.value="";const e=document.querySelector(".js_error_text");null!==e&&e.remove(),paintCharacterList(characters)}),searchBtn.addEventListener("click",handleSearch);for(const e of forms)e.addEventListener("submit",e=>{e.preventDefault()});function renderFavCard(e){const t=document.createElement("li"),a=document.createElement("article");a.classList.add("selected"),a.classList.add("favorites__card");const r=document.createElement("p"),c=document.createElement("i");c.classList.add("fa-solid"),c.classList.add("fa-xmark"),r.classList.add("js_remove_fav"),r.classList.add("favorites__cross--remove"),r.setAttribute("data-id",e.char_id),r.appendChild(c);const s=document.createElement("div");s.setAttribute("style","background-image:url('"+e.img),s.classList.add("favorites__img");const n=document.createElement("h2"),o=document.createTextNode(""+e.name);n.classList.add("favorites__name"),n.appendChild(o);const d=document.createElement("h3"),i=document.createTextNode(""+e.status);return d.classList.add("favorites__status"),d.appendChild(i),a.appendChild(r),a.appendChild(s),a.appendChild(n),a.appendChild(d),t.appendChild(a),t}function paintFavList(){favsSection.classList.remove("collapsed"),favsList.innerHTML="";for(let e=0;e<favoriteCharacters.length;e++)favsList.appendChild(renderFavCard(favoriteCharacters[e]));const e=document.querySelector(".js_no_fav_text");null!==e&&e.remove(),removeCardListener()}function handleSelection(e){const t=parseInt(e.currentTarget.dataset.id),a=characters.find(e=>e.char_id===t);console.log(a.name);const r=favoriteCharacters.findIndex(e=>e.char_id===t);-1===r?(favoriteCharacters.push(a),paintFavList(),setInLocalStorage(favoriteCharacters),checkIfSearch()):(favoriteCharacters.length>1?(favoriteCharacters.splice(r,1),paintFavList(),setInLocalStorage(favoriteCharacters)):(favoriteCharacters.splice(r,1),favsSection.classList.add("collapsed"),localStorage.removeItem("Favorites")),checkIfSearch())}function selectedCardListener(){document.querySelectorAll(".js_card").forEach(e=>{e.addEventListener("click",handleSelection)})}function handleRemoveOne(e){const t=parseInt(e.currentTarget.dataset.id),a=favoriteCharacters.findIndex(e=>e.char_id===t);favoriteCharacters.length>1?(favoriteCharacters.splice(a,1),paintFavList(),setInLocalStorage(favoriteCharacters),checkIfSearch()):favoriteCharacters.length<=1&&(favoriteCharacters=[],localStorage.removeItem("Favorites"),favsSection.classList.add("collapsed"),noFavoritesMessage(),checkIfSearch())}function handleRemoveAll(){favoriteCharacters=[],localStorage.removeItem("Favorites"),favsSection.classList.add("collapsed"),noFavoritesMessage(),checkIfSearch()}function removeCardListener(){document.querySelectorAll(".js_remove_fav").forEach(e=>{e.addEventListener("click",handleRemoveOne)})}function setInLocalStorage(e){localStorage.setItem("Favorites",JSON.stringify(e))}function getFromLocalStorage(){const e=JSON.parse(localStorage.getItem("Favorites"));null!==e?(favoriteCharacters=e,paintFavList()):noFavoritesMessage()}resetBtn.addEventListener("click",handleRemoveAll);