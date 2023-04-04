//criando banner automático
const imgBanner = document.getElementById('banner')
let iBanner = 0
const srcsBanners = [
    'src/img/banner-home-0.jpg',
    'src/img/banner-home-1.jpg',
    'src/img/banner-home-2.jpg',
    'src/img/banner-home-3.jpg',
    'src/img/banner-home-4.jpg'
]

srcsBanners.sort(() => Math.random() - 0.5)
imgBanner.src = srcsBanners[0]
const divBalls = document.querySelector('section:first-child div')
let arrBalls = []

for(let i = 0; i < srcsBanners.length; i++) {
    const ball = document.createElement('span')
    divBalls.appendChild(ball)
    if (i == 0) {
        ball.classList.add('selected')
    }
    ball.id = `ball-${i}`
    ball.addEventListener('click', () => getBanner(i))
    arrBalls.push(document.getElementById(`ball-${i}`))
}

//carregando uma função em que o procedimento irá ser usado em várias ocasiões
function controlBanner(option) {
    switch(option) {
        case 'rotate':
            imgBanner.src = srcsBanners[iBanner]
            arrBalls[iBanner].classList.add('selected')
            banner = setInterval(() => document.body.onload = slide(), 3000)
            break
        case 'clear':
            clearInterval(banner)
            arrBalls[iBanner].classList.remove('selected')
    }
}

function slide() {
    arrBalls[iBanner].classList.remove('selected')
    iBanner++
    if(iBanner == srcsBanners.length) {
        iBanner = 0
    }
    imgBanner.src = srcsBanners[iBanner]
    arrBalls[iBanner].classList.add('selected')
}

let banner = setInterval(() => document.body.onload = slide(), 3000)

// manipulando o banner manualmente, sem perder a contagem automática
function previousBanner() {
    controlBanner('clear')
    iBanner == 0 ? iBanner = srcsBanners.length - 1 : iBanner--
    controlBanner('rotate')
}

document.getElementById('previous-banner').addEventListener('click', previousBanner)

function nextBanner() {
    controlBanner('clear')
    iBanner == srcsBanners.length - 1 ? iBanner = 0 : iBanner++
    controlBanner('rotate')
}

document.getElementById('next-banner').addEventListener('click', nextBanner)

//criando uma função de captura do slide pela bolinha
function getBanner(position) {
    controlBanner('clear')
    iBanner = position
    controlBanner('rotate')
}

//criando elementos a serem carregados na tela inicial
let adoptData
let lostData = []
let foundData = []

async function loadData() {
    const responseAdopt = await fetch('/src/dao/db.json')
    adoptData = await responseAdopt.json()

    const responseLostFound = await fetch('/src/dao/db-perdidos-e-achados.json')
    const lostFoundData = await responseLostFound.json()

    for(const element of lostFoundData) {
        if(element.status == 'P') {
            lostData.push(element)
        } else {
            foundData.push(element)
        }
    }

    getAnimals(adoptData, 'adopt')
    getAnimals(lostData, 'lost')
    getAnimals(foundData, 'found')
}

function getAnimals(data, type) {
    data.sort(() => Math.random() - 0.5)
    const ul = document.querySelector(`#${type} ul`)

    for(let i = 0; i < 3; i++) {
        const li = document.createElement('li')
        const img = document.createElement('img')
        const div = document.createElement('div')
        const pName = document.createElement('p')
        const pAge = document.createElement('p')
        const pGender = document.createElement('p')

        img.src = data[i].animalPhotoUrl
        img.alt = `Foto de ${data[i].animalName}`
        pName.innerHTML = `Nome: <strong>${data[i].animalName}</strong>`
        pAge.innerText = `Idade: ${data[i].age}`
        pGender.innerText = `Sexo: ${data[i].gender}`

        li.appendChild(img)
        div.appendChild(pName)
        div.appendChild(pAge)
        div.appendChild(pGender)
        li.appendChild(div)
        ul.appendChild(li)

        li.addEventListener('click', () => showModal(data[i].animalPhotoUrl, data[i].animalName, type))
    }
}

const mainHome = document.querySelector('main')
const divModal = document.createElement('div')
const divModalAreaCloseLeft = document.createElement('div')
const divModalAreaCloseRight = document.createElement('div')
const divModalContent = document.createElement('div')
const spanCloseModal = document.createElement('span')
const pHeaderModal = document.createElement('p')
const imgModal = document.createElement('img')
const pPreFormModal = document.createElement('p')
const formModal = document.createElement('form')
const labelNameModal = document.createElement('label')
const inputNameModal = document.createElement('input')
const spanNameModal = document.createElement('span')
const labelEmailModal = document.createElement('label')
const inputEmailModal = document.createElement('input')
const spanEmailModal = document.createElement('span')
const submitModal = document.createElement('input')
const loadingSendForm = document.createElement('div')
const imgLoading = document.createElement('img')
const spanLoading = document.createElement('span')

divModal.id = 'modal'
divModalContent.id = 'modal-content'
spanCloseModal.innerText = 'X'
spanCloseModal.id = 'btn-close-modal'
labelNameModal.htmlFor = 'name'
labelNameModal.innerText = 'Nome:'
inputNameModal.type = 'text'
inputNameModal.name = 'name'
inputNameModal.id = 'name'
labelEmailModal.htmlFor = 'email'
labelEmailModal.innerText = 'E-mail:'
inputEmailModal.type = 'email'
inputEmailModal.name = 'email'
inputEmailModal.id = 'email'
submitModal.type = 'submit'
submitModal.value = 'ENVIAR'
submitModal.id = 'send-form'
loadingSendForm.id = 'loading-form'
imgLoading.src = 'src/img/loading_send_form.gif'
imgLoading.alt = 'Loading'

divModalAreaCloseLeft.classList.add('modal-area-close')
divModalAreaCloseRight.classList.add('modal-area-close')

divModalContent.appendChild(spanCloseModal)
divModalContent.appendChild(pHeaderModal)
divModalContent.appendChild(imgModal)
divModalContent.appendChild(pPreFormModal)
divModalContent.appendChild(formModal)
formModal.appendChild(labelNameModal)
formModal.appendChild(inputNameModal)
formModal.appendChild(spanNameModal)
formModal.appendChild(labelEmailModal)
formModal.appendChild(inputEmailModal)
formModal.appendChild(spanEmailModal)
formModal.appendChild(submitModal)
divModal.appendChild(loadingSendForm)
loadingSendForm.appendChild(imgLoading)
loadingSendForm.appendChild(spanLoading)
divModal.appendChild(divModalAreaCloseLeft)
divModal.appendChild(divModalContent)
divModal.appendChild(divModalAreaCloseRight)
mainHome.appendChild(divModal)

function closeModal() {
    divModal.style.display = 'none'
    inputNameModal.value = ''
    inputEmailModal.value = ''    
}

spanCloseModal.addEventListener('click', closeModal)
divModalAreaCloseLeft.addEventListener('click', closeModal)
divModalAreaCloseRight.addEventListener('click', closeModal)

function showModal(animalPhotoUrl, animalName, type) {
    switch(type) {
        case 'adopt':
            pHeaderModal.innerHTML = `Você está a um <strong>CLICK</strong> de formalizar o pedido de adoção do(a) <strong>${animalName}</strong>!`
            pPreFormModal.innerText = 'Preencha o formulário abaixo que entraremos em contato explicando todos os procedimentos!'
            break
        case 'lost':
            pHeaderModal.innerHTML = '<strong>PROCURA-SE ESTE PET!</strong>'
            pPreFormModal.innerText = 'Preencha o formulário abaixo se encontrou!'
            break
        default:
            pHeaderModal.innerHTML = '<strong>FOI ENCONTRADO ESTE PET!</strong>'
            pPreFormModal.innerText = 'Se você é o(a) tutor(a), ou conhece quem seja, preencha o formulário abaixo!'
    }

    imgModal.src = animalPhotoUrl
    imgModal.alt = `Foto de ${animalName}`
    divModal.style.display = 'flex'
}

let nameIsValid = false
let emailIsValid = false

inputNameModal.addEventListener('input', () => {
    if(inputNameModal.value.length < 4) {
        spanNameModal.innerText = 'Nome Inválido'
        nameIsValid = false
    } else {
        spanNameModal.innerText = ''
        nameIsValid = true
    }
})

inputNameModal.addEventListener('blur', () => {
    if(inputNameModal.value == '') {
        spanNameModal.innerText = 'Campo Obrigatório'
        nameIsValid = false
    }
})

inputEmailModal.addEventListener('input', () => {
    if(inputEmailModal.value.includes('@') && inputEmailModal.value.includes('.com')) {
        spanEmailModal.innerText = ''
        emailIsValid = true
    } else {
        spanEmailModal.innerText = 'E-mail Inválido'
        emailIsValid = false
    }
})

inputEmailModal.addEventListener('blur', () => {
    if(inputEmailModal.value == '') {
        spanEmailModal.innerText = 'Campo Obrigatório'
        emailIsValid = false
    }
})

formModal.addEventListener('submit', e => {
    e.preventDefault()

    if(nameIsValid && emailIsValid) {
        loadingSendForm.style.display = 'flex'
        submitModal.style.opacity = 0
        spanLoading.innerText = 'Enviando dados...'
        setTimeout(() => spanLoading.innerText = 'Dados enviados!', 3000)
        setTimeout(() => formModal.submit(), 5000)
    } else if(nameIsValid) {
        alert('Preencha o seu e-mail!')
        spanEmailModal.innerText = 'Campo Obrigatório'
    } else if(emailIsValid) {
        if(inputNameModal.value == '') {
            alert('Preencha o seu nome!')
            spanNameModal.innerText = 'Campo Obrigatório'
        } else {
            alert('Preencha o seu nome corretamente!')
            spanNameModal.innerText = 'Nome Inválido'
        }
    } else {
        if(inputNameModal.value == '' && inputEmailModal.value == '') {
            alert('Preencha todos os campos necessários!')
            spanNameModal.innerText = 'Campo Obrigatório'
            spanEmailModal.innerText = 'Campo Obrigatório'
        } else {
            alert('Preencha os campos corretamente!')

            if(inputNameModal.value == '') {
                spanNameModal.innerText = 'Campo Obrigatório'
                spanEmailModal.innerText = 'E-mail Inválido'
            } else if (inputEmailModal.value == '') {
                spanNameModal.innerText = 'Nome Inválido'
                spanEmailModal.innerText = 'Campo Obrigatório'
            } else {
                spanNameModal.innerText = 'Nome Inválido'
                spanEmailModal.innerText = 'E-mail Inválido'
            }
        }
    }
})

document.body.onload = loadData()