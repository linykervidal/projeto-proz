let map = null;

let nameData = '';
let emailData = '';

let nameIsValid = false;
let emailIsValid = false;

const modalBody = document.getElementById("modalBody");
const modalContent = document.createElement("div");

modalContent.id = 'div-modal-content'

const listAnimals = document.getElementById("listAnimals");
let listContent = null;

const mapBody = document.getElementById("map");

loadDataAllAnimals = () => {
  // Chama função que mostra trodos os animais da ONG
  showAllAnimals();

  // Instânciando o mapa
  map = L.map('map').setView([0, 0], 15); // inAdoptionProcess

  createMap();
}

showAllAnimals = async () => {
  // Limpando a lista
  listAnimals.innerHTML = "";

  mapBody.style.display = "none";
  listAnimals.style.display = "flex";

  const animalData = await fetch('https://backend-lavhec.up.railway.app/getAllAnimalsOng')
  .then(response => {
    return response.json();
  })
  .catch(error => {
    showAlert('Ops, erro ao carregar dados!') 
  });

  for (let i = 0; i < animalData.length; i++) {
    // Criando o elemento que vai ser inserido na lista e atribuindo na variavel
    listContent = document.createElement("li");

    // Formatando o HTML que vai ser inserido na lista (ul), a \ é usada para quebrar o template string    
    listContent.innerHTML = `<li class="item-list-animals" onclick="showModalAdoption(
        \'${animalData[i]["animalPhotoUrl"]}\',
        \'${animalData[i]["animalName"]}\',
        \'${animalData[i]["inAdoptionProcess"]}\',
        \'${'animals_ong'}\', 
        \'${animalData[i]["id"]}\',
      )">
      <div class="card">
        <img
          id=${animalData[i]["id"]}
          src=${animalData[i]["animalPhotoUrl"]}
          class="animal-picture"
        />
        <div class="animal-details">
          <p>Nome: <b>${animalData[i]["animalName"]}</b></p>
          <p>Idade: ${animalData[i]["age"]}</p>
          <p>Sexo: ${animalData[i]["gender"]}</p>
        </div>
      </div>
    </li>`;

    // Inserindo um animal na lista
    listAnimals.appendChild(listContent);
    
    // Se estiver em processo de doação muda a opacidade da img    
    if (animalData[i]["inAdoptionProcess"] == 1) {
      document.getElementById(animalData[i]["id"]).style.opacity = 0.5        
    }
  }
}

showAnimalsFilteredSorted = async (type) => {
  // Limpando a lista
  listAnimals.innerHTML = "";

  mapBody.style.display = "none";
  listAnimals.style.display = "flex";
  
  const filteredData = await fetch('https://backend-lavhec.up.railway.app/getAnimalsFiltered', {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      type: type,
    }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => {
    return response.json();
  })
  .catch(error => {
    showAlert('Ops, erro ao carregar dados!') 
  });  

  for (let i = 0; i < filteredData.length; i++) {
    // Criando o elemento que vai ser inserido na lista e atribuindo na variavel
    listContent = document.createElement("li");

    // Formatando o HTML que vai ser inserido na lista (ul)
    listContent.innerHTML = `<li class="item-list-animals" onclick="showModalAdoption(
      \'${filteredData[i]["animalPhotoUrl"]}\',
      \'${filteredData[i]["animalName"]}\',
      \'${filteredData[i]["inAdoptionProcess"]}\',
      \'${'animals_ong'}\', 
      \'${filteredData[i]["id"]}\',  
    )">
      <div class="card">
        <img
          id=${filteredData[i]["id"]}
          src=${filteredData[i]["animalPhotoUrl"]}
          class="animal-picture"
        />
        <div class="animal-details">
          <p>Nome: <b>${filteredData[i]["animalName"]}</b></p>
          <p>Idade: ${filteredData[i]["age"]}</p>
          <p>Sexo: ${filteredData[i]["gender"]}</p>
        </div>
      </div>
    </li>`;

    // Inserindo um animal na lista
    listAnimals.appendChild(listContent);

    // Se estiver em doação muda a opacidade da img
    if (filteredData[i]["inAdoptionProcess"] == 1) {
      document.getElementById(filteredData[i]["id"]).style.opacity = 0.3        
    }
  }
}

showModalAdoption = (animalPhotoUrl, animalName, inAdoptionProcess, animalLocation, id) => {
  if (inAdoptionProcess == 1) {
    showAlert('Ops, pet em processo de adoção!');     
  } else {
    // Formatando conteúdo a ser inserido no elemento
    modalContent.innerHTML = `<div id="containerLoadingSendForm" class="container-loading-send-form">
      <img 
        src="../img/loading_send_form.gif" 
        class="gif-loading-send-form"  
        alt="Loading" 
      >
    </div> 
    <div class="modal-content">
    <div class="modal-container-header">
      <div class="modal-container-btn-close-header">
        <button class="btn-close-modal" onclick="closeModalAdoption()">X</button>
      </div>            
      <div id="modalContainerTitleHeader" class="modal-container-title-header">
        <p class="modal-title-header">
          Você esta a um <b>CLICK</b> de formalizar o pedido de adoção do(a)
          <b>${animalName}</b>!
        </p>
      </div>
    </div>

    <div class="modal-container-picture">
      <img
        src=${animalPhotoUrl}
        alt="Foto do Animal"
        class="modal-animal-picture"
      />
    </div>

    <div class="modal-container-form">            
      <div class="modal-container-title-form">
        <p class="modal-title-form">
          Preencha o formulário abaixo que entraremos em contato
          explicando todos os procedimentos! 
        </p>
      </div>
      <form action="" class="modal-container-input-form">
        <label class="label-form" for="userName">Nome:</label>
        <input id="userName" class="input-form-get-data" type="text" name="userName"/>
        <span id="nameError" class="nameError"></span>        
        <br/>
        <label class="label-form" for="userEmail">E-mail:</label>
        <input id="userEmail" class="input-form-get-data" type="email" name="userEmail"/>
        <span id="emailError" class="emailError"></span>
        <br/>
        <input id="submitForm" class="btn-form-send-data" type="submit" value="ENVIAR"/>       
      </form>
    </div>
    </div>`;  

    // Inserindo o conteudo no corpo do Modal
    modalBody.appendChild(modalContent);

    // Habilitando a renderização do Modal
    modalBody.style.display = "block";

    enableValidation(animalLocation, id);    
  }
}

closeModalAdoption = () => {
  // Limpando o corpo do Modal
  modalBody.innerHTML = "";  

  // Alterando a renderização do Modal
  modalBody.style.display = "none";
}

enableValidation = (animalLocation, id) => {
  const usarName = document.getElementById('userName');
  const spanNameError = document.getElementById('nameError');
  const usarEmail = document.getElementById('userEmail');
  const spanEmailError = document.getElementById('emailError');
  const submitForm = document.getElementById('submitForm');

  usarName.addEventListener('input', (event) => {
    nameData = event.target.value;
  
    if (nameData.length < 4) {
        nameIsValid = false;
        usarName.style.color = "red"; 
        usarName.style.border = "2px solid red"; 
        spanNameError.style.display = "flex"; 
        spanNameError.innerHTML = "Nome Inválido";        
    } else {
        nameIsValid = true;
        usarName.style.color = "#CB8A67"; 
        usarName.style.border = "2px solid #CB8A67"; 
        spanNameError.style.display = "none";
        spanNameError.innerHTML = "";         
    }    
  });

  usarEmail.addEventListener('input', (event) => { 
    emailData = event.target.value;

    if (!emailData.includes('@') || !emailData.includes('.com')) {
        // Email inválido mostra o span
        emailIsValid = false;
        usarEmail.style.color = "red"; 
        usarEmail.style.border = "2px solid red"; 
        spanEmailError.style.display = "flex";
        spanEmailError.innerHTML = "Email Inválido";      
    } else {
        // Email válido retira o span
        emailIsValid = true;
        usarEmail.style.color = "#CB8A67"; 
        usarEmail.style.border = "2px solid #CB8A67"; 
        spanEmailError.style.display = "none";
        spanEmailError.innerHTML = ""; 
    }
  });

  submitForm.addEventListener('click', (event) => {
      event.preventDefault();

      if (nameData === '') {
          spanNameError.style.display = "flex"; 
          spanNameError.innerHTML = "Campo Obrigatório";
      }
      if (emailData === '') {
          spanEmailError.style.display = "flex"; 
          spanEmailError.innerHTML = "Campo Obrigatório";
      }
      if(nameData != '' && nameIsValid == true && emailData != '' && emailIsValid == true) {
          // Limpando os inputs
          usarName.value = '';
          usarEmail.value = '';

          showLoadingSendForm();          
          createAdoptionOrder(animalLocation, id); 
      }    
  });
}

showLoadingSendForm = () => {
  document.getElementById('submitForm').style.display = "none";
  document.getElementById('containerLoadingSendForm').style.display = "flex";
  document.getElementById('userName').disabled = true;
  document.getElementById('userEmail').disabled = true; 
}

closeLoadingSendForm = () => {
  nameData = '';
  emailData= ''; 
  
  closeModalAdoption();
}

createMap = async () => { 
  // Carregando os dados dos animais do banco via API
  let otherAnimals = await fetch('https://backend-lavhec.up.railway.app/getAllAnimalsOwner')
  .then(data => {
    return data.json();
  })
  .catch(error => {
    console.log(error);
  }); 

  // Tag obrigatória não remover --> Atribuição de uso!
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);   

  // Add animais ao mapa
  for (let i = 0; i < otherAnimals.length; i++) {
    if (otherAnimals[i].inAdoptionProcess == 0) {
      L.marker(
        [otherAnimals[i].latitude, otherAnimals[i].longitude],
        {icon: L.icon({
            iconUrl: otherAnimals[i].iconUrl,
            iconSize:     [50, 50], // Tamanho do icone
            iconAnchor:   [15, 75], // Localização do icone
            popupAnchor:  [-3, -76], // Eixo do popup
          })  
        },
      )
      .addTo(map)
      .bindPopup(`
        <b>Estou em busca de um novo lar, me adote!</b> <br>
        <button class="btn-adopt-popup" onclick="showModalAdoption(
          \'${otherAnimals[i].animalPhotoUrl}\',
          \'${otherAnimals[i].animalName}\',
          \'${otherAnimals[i].inAdoptionProcess}\',
          \'${'animals_owner'}\', 
          \'${otherAnimals[i].id}\',
        )">
          Adotar
        </button>`
      ).openPopup();
    }
  }
}

showMap = async () => {
  // Desabilita a visualização da lista de animais
  listAnimals.style.display = "none";

  // Habilita a visualização do mapa
  mapBody.style.display = "flex"; 

  // Falando pro mapa que o tela foi redesenhad
  map.invalidateSize();
}

showAlert = (textMessage) => {
  document.getElementById('alertBody').innerHTML = textMessage;
  document.getElementById('alert').classList.add('visible');
  
  setTimeout(() => {
    document.getElementById('alert').classList.remove('visible');      
  }, 2500);
}

createAdoptionOrder = async (tableName, id) => {  
  await fetch('https://backend-lavhec.up.railway.app/createAdoptionOrder', {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      id: id,
      tableName: tableName
    }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => {
    if (response.status == 201) {
      closeLoadingSendForm();
      showAlert('Ordem de adoção criada com sucesso!')
      setTimeout(() => {
        document.location.reload(true);   
      }, 2000);
    }    
  })
  .catch(error => {
    closeLoadingSendForm();
    showAlert('Ops, erro ao criar ordem de adoção!') 
  });
}

const checkboxFilter = document.getElementById("checkbox-filter");
const barFilter = document.querySelector(".filter-animal-type");
const btnsFilter = document.getElementsByClassName("btn");
let arrBtnsFilter = [];
let time = 0;


for (const element of btnsFilter) {
  arrBtnsFilter.push(element);
}

function isFilterChecked() {
  clearInterval(loadMQA);
  if (checkboxFilter.checked) {
    for (let i = 0; i < arrBtnsFilter.length; i++) {
      setTimeout(() => (arrBtnsFilter[i].style.marginLeft = "0"), time);
      time = time + 100;
      arrBtnsFilter[i].addEventListener("click", disableFilter);
    }
    barFilter.style.paddingBottom = "145px";// mexi aqui
  } else {
    for (let i = arrBtnsFilter.length; i > 0; i--) {
      setTimeout(
        () => (arrBtnsFilter[i - 1].style.marginLeft = "-1000px"),
        time
      );
      time = time + 100;
    }
    setTimeout(() => (barFilter.style.paddingBottom = "10px"), time);
  }
  setTimeout(() => (loadMQA = setInterval(mediaQueryAdoption, 0)), time);
  time = 0;
}

function disableFilter() {
  clearInterval(loadMQA);
  checkboxFilter.checked = false;
  for (let i = arrBtnsFilter.length; i > 0; i--) {
    setTimeout(() => (arrBtnsFilter[i - 1].style.marginLeft = "-1000px"), time);
    time = time + 100;
  }
  setTimeout(() => {
    barFilter.style.paddingBottom = "10px";
    loadMQA = setInterval(mediaQueryAdoption, 0);
  }, time);
  time = 0;
}

function mediaQueryAdoption() {
  if (window.innerWidth > 650) {
    for (let i = arrBtnsFilter.length; i > 0; i--) {
      arrBtnsFilter[i - 1].style.marginLeft = "0";
      arrBtnsFilter[i - 1].removeEventListener("click", disableFilter);
    }
    barFilter.style.paddingBottom = "10px";
    document
      .querySelector(".btn-all-animals")
      .removeEventListener("click", disableFilter);
  } else {
    if (checkboxFilter.checked) {
      for (let i = 0; i < arrBtnsFilter.length; i++) {
        arrBtnsFilter[i].style.marginLeft = "0";
        arrBtnsFilter[i].addEventListener("click", disableFilter);
      }
      barFilter.style.paddingBottom = "145px";// mexi aqui
    } else {
      for (let i = arrBtnsFilter.length; i > 0; i--) {
        arrBtnsFilter[i - 1].style.marginLeft = "-1000px";
      }
      barFilter.style.paddingBottom = "10px";
    }
    document
      .querySelector(".btn-all-animals")
      .addEventListener("click", disableFilter);
  }
}

let loadMQA = setInterval(mediaQueryAdoption, 0);
