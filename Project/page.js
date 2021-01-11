let q = sessionStorage.getItem('cuisine');
let healthylabel = sessionStorage.getItem('meal')
let diet = sessionStorage.getItem('diet')
var a = fetch(`https://api.edamam.com/search?q=${q}&app_id=0ba87396&app_key=191581d783791b19242c578461295369&diet=${diet}&healthLabels=${healthylabel}`)
sessionStorage.clear();
a.then((b) => {
    return b.json();
}).then((b) => {
    //console.log(b.hits);
    var data = b, k = 0, count = 0;
    var container = document.createElement('div')
    container.setAttribute('class', 'container-fluid p-4 col-sm')
    for (var i = data.from; i < data.to; i++) {
        var row = document.createElement('div')
        row.setAttribute('class', 'row')
        for (var i = 0; i < 4; i++) {
            var energy = data.hits[k].recipe.totalNutrients.ENERC_KCAL.quantity
            var fat = data.hits[k].recipe.totalNutrients.FAT.quantity
            // console.log(Math.round(energy))
            for (var d in data.hits[k].recipe.ingredientLines)
                count++
            console.log(count)
            var col = document.createElement('div')
            col.setAttribute('class', 'col-3')
            var carddeck = document.createElement('div')
            carddeck.setAttribute('class', 'card-deck')
            var card = document.createElement('div')
            card.setAttribute('class', 'card')
            var img = document.createElement('img')
            img.setAttribute('src', data.hits[k].recipe.image)
            img.setAttribute('class', 'card-img-top')
            img.setAttribute('style', 'border-radius: 50px 0px 0px;')
            var cardbody = document.createElement('div')
            cardbody.setAttribute('class', 'card-body')
            var h5 = document.createElement('h5')
            h5.setAttribute('class', 'card-title')
            h5.innerText = data.hits[k].recipe.label
            var span = document.createElement('span')
            span.setAttribute('class', 'card-text')
            span.innerHTML = `<img src="https://img.icons8.com/ios-filled/25/000000/caloric-energy--v2.png"/>` + '  ' + Math.round(energy) + " Kcal | " + count + " Incredients"
            var br = document.createElement('div')
            br.innerHTML = "<br>"
            var button = document.createElement('a')
            button.setAttribute('id','button')
            button.setAttribute('class','btn btn-primary btn-lg btn-block')
            button.setAttribute('href',data.hits[0].recipe.url)
            button.innerHTML = 'Details'
            cardbody.append(h5,span,br,button)
            card.append(img, cardbody)
            carddeck.append(card)
            col.appendChild(carddeck)
            row.appendChild(col)
            container.appendChild(row)
            document.body.append(container)
            k++
        }
    }
})
    .catch((error) => {
        console.log(error)
    })

