import {movies} from './db.js'

let ul = document.querySelector('.promo__interactive-list')
let c  = document.querySelector('.promo__bg')
let bg  = document.querySelector('.bg')
let inpSearch = document.querySelector('#search')
let searIcon = document.querySelector('.sear-icon')
c.style.backgroundImage = `url('./img/bg.jpg')`

searIcon.onclick = () => {
    let value = inpSearch.value.toLowerCase().trim()

    let filtered = movies.filter(item => {
        if(item.Title.toLowerCase().includes(value)) {
            return item
        }
    })
    reload(filtered)
}

const reload = (arr) => {
    ul.innerHTML = ""
    showMovie(arr[0])
    
    for(let item of arr) {
        let li = document.createElement('li')
        let del = document.createElement('div')

        li.classList.add('promo__interactive-item')
        del.classList.add('delete')

        li.innerHTML = `${arr.indexOf(item) + 1}. ${item.Title}`

        li.append(del)
        ul.append(li)

        del.onclick = () => {
            arr = arr.filter(elem => elem.ID !== item.ID)

            reload(arr)
        }

        li.onclick = () => {
            showMovie(item)
            openModal()
        }
    }
}

const showMovie = (movie) => {
    c.style.backgroundImage = `url('${movie.Poster}')`
}

reload(movies)

// ДЗ
// 1) Сделать жанры 
// 2) Сделать модальное окно где показаны остальные данные так же данне показываются на главное странице 
// 3) Рейтинг фильмов по звездам 10 баллов IMDB это 5 звезд
// 4) Поисковик по клику а не по печати 

for(let item of movies) {
    let li = document.createElement('li')
    li.classList.add('promo__menu-item')
    li.innerHTML = item.Genre

    bg.append(li)
}



// модалка

let modal = document.querySelector('.modal')
let modal_bg = document.querySelector('.modal_bg')
let cancel = document.querySelector('.cancel')

const openModal = () => { 
    modal.style.display = 'block'
    modal_bg.style.display = 'block'
    modal.style.transform = 'translate(-50%, -50%) scale(1)'

    setTimeout(() => {
        modal.style.opacity = '1'
        modal_bg.style.opacity = '1'
    }, 200);
}
const closeModal = () => {
    modal.style.opacity = '0'
    modal_bg.style.opacity = '0'
    modal.style.transform = 'translate(-50%, -50%) scale(.2)'

    setTimeout(() => {
        modal.style.display = 'none'
        modal_bg.style.display = 'none' 
    }, 200);
}

cancel.onclick = () => {
    closeModal()
}