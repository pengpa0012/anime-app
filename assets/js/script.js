

const btn = document.querySelector('form')
const wrap = document.querySelector('.anime-list-wrapper')
const topAnime = document.querySelector('.top-anime')

window.addEventListener('load', async function(){
	const topAnimeData = await fetch("https://api.jikan.moe/v3/top/anime/1/airing")
	const topAnimeDataRes = await topAnimeData.json()

    for(let i = 0; i <= 10; i++){
        topAnime.innerHTML += `
            <li class="mb-2 link-hover">
                <a href="${topAnimeDataRes.top[i].url}" target="_blank" class="text-dark text-decoration-none">
                    ${topAnimeDataRes.top[i].title}
                </a>      
            </li>   
        `
    }	
    
    const popularAnimeData = await fetch("https://api.jikan.moe/v3/top/anime/1/airing")
	const popularAnimeDataRes = await popularAnimeData.json()
    
   
    popularAnimeDataRes.top.forEach(anime => {
        wrap.innerHTML += `
        <div class="card shadow-sm p-0 m-2">
            <div class="card-img">
                <img src="${anime.image_url}" alt="anime-visual" class="img-size">
            </div>
            <div class="card-body px-3 d-flex flex-column justify-content-between">
                <div class="mb-3">
                    <h6 class="mb-1">${anime.title}</h6>
                    <span class="d-block mb-0 fs-tiny">Score: ${anime.score}</span>
                    <span class="d-block mb-0 fs-tiny">Rank: ${anime.rank}</span>
                    <span class="d-block mb-0 fs-tiny">Type: ${anime.type}</span>
                    <span class="d-block mb-0 fs-tiny">Episodes: ${anime.episodes || 'ongoing'}</span>
                </div>
                <a href="${anime.url}" target="_blank" class="btn btn-primary me-2">
                    Check Anime
                </a>
            </div>
        </div>
    `
    })  
})

const searchInput = document.querySelector('input[type="search"]')

btn.addEventListener('submit', async function(e){
    e.preventDefault()

    if(searchInput.value == "") return
    
    const res = await fetch(`https://api.jikan.moe/v3/search/anime?q=${searchInput.value}`)  
    const data = await res.json()
    
    wrap.innerHTML = ''

    data.results.forEach(anime => {
        wrap.innerHTML += `
            <div class="card shadow-sm p-0 m-2">
                <div class="card-img">
                    <img src="${anime.image_url}" alt="anime-visual" class="img-size">
                </div>
                <div class="card-body px-3 d-flex flex-column justify-content-between">
                    <div class="mb-3">
                        <h6 class="mb-1">${anime.title}</h6>
                        <span class="d-block mb-0 fs-tiny">Score: ${anime.score}</span>
                        <span class="d-block mb-0 fs-tiny">Rated: ${anime.rated}</span>
                        <span class="d-block mb-0 fs-tiny">Type: ${anime.type}</span>
                        <span class="d-block mb-0 fs-tiny">Episodes: ${anime.episodes || 'ongoing'}</span>
                    </div>
                    <p class="text-black-50 text-limit">${anime.synopsis}</p>
                    <a href="${anime.url}" target="_blank" class="btn btn-primary me-2">
                        Check Anime
                    </a>
                </div>
            </div>
	`
    });
	
})
 