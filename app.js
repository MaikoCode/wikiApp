// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form")
const input = document.querySelector("input")
const errorMsg = document.querySelector(".error-msg ")
const loader = document.querySelector(".loader")

form.addEventListener("submit", handleSubmit)

function handleSubmit(e){
    e.preventDefault()

    if(input.value === ""){
        errorMsg.textContent = "Whops, veuillez remplir le champ";  
        return;
    }else{
        errorMsg.textContent = "";
        loader.style.display = "flex";
        results.textContent = "";
        wikiApiCall(input.value);
    }
}

async function wikiApiCall(searchInput){

    try{

    
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`);
    if(!response.ok){
        throw new Error(`${response.status}`); // On gere les erreurs 404
    }
    const data = await response.json() // On va recevoir nos data en js(extraction)
    //console.log(data);
    createCards(data.query.search);
    }catch(error){
        errorMsg.textContent = `${error}`;
        loader.style.display = "none";
    }
}

const results = document.querySelector(".results")

function createCards(data){
    if(!data.length){
        errorMsg.textContent = "Whopsy, aucun resultat";
        loader.style.display = "none";
        return ;
    }

    // Pour chaque donnée, on cree une carte
    data.forEach(el => {
        const url = `https://en.wikipedia.org/?curid=${el.pageid}`
        const card = document.createElement("div");
        card.className  = "result-item";
        card.innerHTML = `
        <h3>
            <a href="${url}" target="_blank" >${el.title}</a>
        </h3>
        <a href="${url}" target="_blank" class="result-link" >${url}</a>
        <span class="result-snippet">${el.snippet}</span>
        `

        results.appendChild(card)
        loader.style.display = "none";
    })
}
