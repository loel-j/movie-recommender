// ... (previous code) ...

searchButton.addEventListener('click', async () => {
    const movieTitle = movieInput.value;
    try {
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `movieTitle=${movieTitle}`
        });
        const data = await response.json();
        if (data.error) {
            movieInfo.innerHTML = `<p>${data.error}</p>`;
        } else {
            displayMovieInfo(data.movie);
            displayRecommendations(data.recommendations);
        }
    } catch (error) {
        console.error('Error:', error);
        movieInfo.innerHTML = `<p>Error fetching data.</p>`;
    }
});

function displayMovieInfo(movie) {
    movieInfo.innerHTML = `<h2>${movie.title}</h2><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">`;
    // Add other details as needed
}


function displayRecommendations(recommendations){
    let recHTML = "<ul>";
    recommendations.forEach(rec =>{
        recHTML += `<li>${rec.title}</li>`;
    });
    recHTML += "</ul>";
    recommendations.innerHTML = recHTML;    
}