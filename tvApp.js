/*
   attach official website to posters
*/

const form = document.querySelector('#searchForm');
const canvas = document.querySelector('.canvas');

form.addEventListener('submit', (e) => {
    
    //prevent the form from submitting 
    //this has to come before any other code
    e.preventDefault();
    
    //clear existing posters
    canvas.innerHTML = "";
    //use console.dir to see the different properties
    const userInput = form.elements.query.value;
    addMoviePoster(userInput);
    //reset search bar
    form.elements.query.value = '';
})


const addMoviePoster = async (userInput) => {
    const posterSrcArray = await fetchMoviePoster(userInput);
    
    //iteratively put posters
    for (let ii of posterSrcArray){
        const newAnchor = document.createElement('a');
        newAnchor.href = ii[1];
        newAnchor.target = "_blank";
        const newPoster = document.createElement('img');
        newPoster.src = ii[0];
        newAnchor.append(newPoster);
        canvas.append(newAnchor);
    }
}

const fetchMoviePoster = async function(userInput){
    //for some reason .then did't work
    try{
        //customizing the request with parameters
        const config = {params: {q: userInput}, headers: {}}
        const tvDat = await axios.get(`http://api.tvmaze.com/search/shows`, config)
        console.log(tvDat.data);

        let posterArray = [];

        //print out all movie posters
        for (let ii of tvDat.data){
            if(ii.length !== 0){
                //some movies may not have posters
                if(ii.show.image !== null){
                    console.log(ii.show.image.medium);
                    posterArray.push([ii.show.image.medium, ii.show.officialSite])
                }
            } 
        }
        return posterArray
    }
    catch (err) {
        console.log(err);
    }    
}
