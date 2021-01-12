let q = sessionStorage.getItem('cuisine');
let healthylabel = sessionStorage.getItem('meal')
let diet = sessionStorage.getItem('diet')
function clear(){
    sessionStorage.clear();
}
var a = fetch(`https://api.edamam.com/search?q=${q}&app_id=0ba87396&app_key=191581d783791b19242c578461295369&diet=${diet}&healthLabels=${healthylabel}`)
a.then((b) => {
    return b.json();
}).then((b) => {
    //console.log(b.hits);
    var data = b, k = 0, count = 0;
    var container = document.createElement('div')
    container.setAttribute('class', 'container-fluid p-4 col-sm-3 col-lg-12')
    for (var i = data.from; i < data.to; i++) {
        var row = document.createElement('div')
        row.setAttribute('class', 'row')
        for (var j = 0; j < 4; j++) {
            var energy = data.hits[k].recipe.totalNutrients.ENERC_KCAL.quantity
            //var fat = data.hits[k].recipe.totalNutrients.FAT.quantity
            // console.log(Math.round(energy))
            for (var d in data.hits[k].recipe.ingredientLines)
                count++
            var col = document.createElement('div')
            col.setAttribute('class', 'col col-sm-12 col-lg-3')
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
            var button = document.createElement('button')
            button.setAttribute('id','details')
            button.setAttribute('type','button')
            button.setAttribute('class','btn btn-primary btn-lg btn-block')
            button.setAttribute('data-toggle','modal')
            button.setAttribute('data-target',`#staticBackdrop${k}`)
           // button.setAttribute('href',data.hits[0].recipe.url)
            button.innerHTML = 'Details'
            var modalfade = document.createElement('div')
            modalfade.setAttribute('class','modal fade')
            modalfade.setAttribute('id',`staticBackdrop${k}`)
            modalfade.setAttribute('style','')
            modalfade.setAttribute('data-backdrop','static')
            modalfade.setAttribute('data-keyboard','false')
            modalfade.setAttribute('tabindex','-1')
            modalfade.setAttribute('aria-labelledby','staticBackdropLabel')
            modalfade.setAttribute('aria-hidden','true')
            var modaldialog = document.createElement('div')
            modaldialog.setAttribute('class','modal-dialog')
            var modalcontent = document.createElement('div')
            modalcontent.setAttribute('class','modal-content')
            var modalheader = document.createElement('div')
            modalheader.setAttribute('class','modal-header')
            var h4 = document.createElement('h5')
            h4.setAttribute('class','staticBackdropLabel')
            h4.innerText = data.hits[k].recipe.label
            var button1 = document.createElement('button')
            button1.setAttribute('type','button')
            button1.setAttribute('class','close')
            button1.setAttribute('data-dismiss','modal')
            button1.setAttribute('aria-label','Close')
            button1.innerHTML = '<span aria-hidden="true">&times;</span>'
            modalheader.append(h4,button1)
            var modalbody = document.createElement('div')
            modalbody.setAttribute('class','modal-body')
            var dietlabels = document.createElement('p')
            dietlabels.innerHTML = `<h5>Diet Labels:</h5>${data.hits[k].recipe.dietLabels.join(", ")}`
            var incredient = document.createElement('p')
            var hl = document.createElement('p')
            hl.innerHTML = `<h5>Health Labels:</h5>${data.hits[k].recipe.healthLabels.join(", ")}`
            incredient.innerHTML = `<h5>Ingredient List:</h5>${data.hits[k].recipe.ingredientLines.join(",  ")}`
            modalbody.append(dietlabels,hl, incredient)
            var modalfooter = document.createElement('div')
            modalfooter.setAttribute('class','modal-footer')
            var butt = document.createElement('button')
            butt.setAttribute('type','button')
            butt.setAttribute('class','btn btn-secondary')
            butt.setAttribute('data-dismiss','modal')
            butt.innerText = 'Close'
            modalfooter.append(butt)
            modalcontent.append(modalheader,modalbody,modalfooter)
            modaldialog.appendChild(modalcontent)
            modalfade.appendChild(modaldialog)
            cardbody.append(h5,span,br,button,modalfade)
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

