let rawData = {};
let animalData = [];
let filteredSortedData = [];
let lista = '';
let nameData = ''
let nameIsValid = false
let emailData = ''
let emailIsValid = false
let modalContent
let modalBody

async function loadData() {
  // Carregando o arquivo com os dados dos animais do arquivo na pasta local
  //rawData = await fetch("../dao/db-perdidos-e-achados.json");
  //animalData = await rawData.json();

  // Carregando o arquivo com os dados dos animais da API
  animalData = await fetch('https://backend-lavhec.up.railway.app/getAllAnimalsLostFound')
  .then(response => {
    return response.json();
  })
  .catch(error => {
    alert('Ops, erro ao carregar dados!') 
  });

  getPerdidosAchados();
}

function getPerdidosAchados() {

  filteredSortedData = animalData.filter((pet) => pet.status == 'P');

  // Limpando a lista de Perdidos
  lista = "listPerdidos";
  document.getElementById(lista).innerHTML = "";
  for (let i = 0; i < filteredSortedData.length; i++) {
    listContent = document.createElement("li");
    listContent.innerHTML = `
      <li class="item-list-animals" onclick="showModalAdoption(
        \'${filteredSortedData[i]["animalPhotoUrl"]}\',
        \'${filteredSortedData[i]["animalName"]}\',
        \'${filteredSortedData[i]["tag"]}\',
        \'${filteredSortedData[i]["status"]}\',
        \'${filteredSortedData[i]["gender"]}\',
        \'${filteredSortedData[i]["age"]}\')">
        <div class="card">
          <img src=${filteredSortedData[i]["animalPhotoUrl"]} alt="Detalhes do animal" class="animal-picture" />
          <div class="animal-details">
            <p>Nome: <strong>${filteredSortedData[i]["animalName"]}</strong></p>
            <p>Sexo: ${filteredSortedData[i]["gender"]}</p>
            <!--<p>Tamanho: ${filteredSortedData[i]["status"]}</p>-->
            <p>Idade: ${filteredSortedData[i]["age"]}</p>
          </div>
        </div>
      </li>`;
    document.getElementById(lista).appendChild(listContent);
    /*if(i==5){break;}*/
  }

  filteredSortedData = animalData.filter((pet) => pet.status == 'A');

  // Limpando a lista de Achados
  lista = "listAchados";
  document.getElementById(lista).innerHTML = "";
  for (let i = 0; i < filteredSortedData.length; i++) {
    listContent = document.createElement("li");
    listContent.innerHTML = `
      <li class="item-list-animals" onclick="showModalAdoption(
        \'${filteredSortedData[i]["animalPhotoUrl"]}\',
        \'${filteredSortedData[i]["animalName"]}\',
        \'${filteredSortedData[i]["tag"]}\',
        \'${filteredSortedData[i]["status"]}\',
        \'${filteredSortedData[i]["gender"]}\',
        \'${filteredSortedData[i]["age"]}\')">
        <div class="card">
          <img src=${filteredSortedData[i]["animalPhotoUrl"]} 
              alt="Detalhes do animal" 
              class="animal-picture" />
          <div class="animal-details">
            <p>Nome: <strong>${filteredSortedData[i]["animalName"]}</strong></p>
            <p>Sexo: ${filteredSortedData[i]["gender"]}</p>
            <!--<p>Tamanho: ${filteredSortedData[i]["status"]}</p>-->
            <p>Idade: ${filteredSortedData[i]["age"]}</p>
          </div>
        </div>
      </li>`;
    document.getElementById(lista).appendChild(listContent);
    /*if(i==5){break;}*/
  }

}

function showModalAdoption(animalPhotoUrl, animalName, animalTag, animalStatus, animalGender, animalAge) {

  let tag = 'CACHORRO'
  if (animalTag == 'cat') {
    tag = 'GATO'
  }
  let texto1 = 'PROCURA-SE ESSE ' + tag;
  let texto2 = 'Preencha abaixo se o encontrou.'; // + tag;
  if (animalStatus == 'A') {
    texto1 = 'FOI ACHADO ESSE ' + tag;
    texto2 = 'Preencha abaixo se deseja adotá-lo.'; // + tag;
  }

  // Variavel que vai receber o conteúdo a ser inserido no corpo do Modal
  modalContent = document.createElement("div");

  // Formatando conteúdo a ser inserido no elemento
  modalContent.innerHTML = `<div class="modal-content">
    <div class="modal-container-header">
      <div class="modal-container-btn-close-header">
        <button class="btn-close-modal" onclick="closeModalAdoption()">X</button>
      </div>            
      <div id="modalContainerTitleHeader" class="modal-container-title-header">
        <p class="modal-title-header">
          <strong>${texto1}</strong>
        </p>
      </div>
    </div>

    <div class="modal-container-picture">
      <img src=${animalPhotoUrl} 
        alt="Foto do Animal"
        class="modal-animal-picture"
      />
    </div>

    <div class="modal-container-form">            
      <div class="modal-container-title-form">
        <p class="modal-title-form"><strong>${animalName}</strong></p>
        <p class="modal-title-form">${animalGender}</p>
        <p class="modal-title-form">${animalAge}</p>
      </div>
      <div class="modal-container-title-form">
        <p class="modal-title-form"><strong>${texto2}</strong></p>
      </div>
      <form action="#" class="modal-container-input-form">
        <label class="label-form" for="userName">Nome:</label>
        <input class="input-form-get-data" type="text" id="userName" name="userName"/>
        <span id="nameError" class="nameError"></span>
        
        <!--
        <label class="label-form" for="userTelefone">Telefone:</label>
        <input class="input-form-get-data" type="text" id="userName" name="userTelefone"/>
        -->
        
        <label class="label-form" for="userEmail">E-mail:</label>
        <input class="input-form-get-data" type="email" id="userEmail" name="userEmail"/>
        <span id="emailError" class="emailError"></span>

        <br/>

        <input id="submitForm" class="btn-form-send-data" type="submit" value="ENVIAR" />
        <div id="containerLoadingSendForm" class="container-loading-send-form">
          <img 
              src="../img/loading_send_form2.gif" 
              class="gif-loading-send-form"  
              alt="Loading" 
          >
          <span id="sendFormStatus" class="sendFormStatus"></span>
        </div>
      </form>            
    </div>
  </div>`;  

  // Inserindo o conteudo no corpo do Modal
  document.getElementById("modalBody").appendChild(modalContent);

  // Variavel que representa o corpo do Modal
  modalBody = document.getElementById("modalBody");

  // Alterando a renderização do Modal
  modalBody.style.display = "block";

  enableValidation();
}

function closeModalAdoption() {
  // Limpando o corpo do Modal
  document.getElementById("modalBody").innerHTML = "";  

  // Criando Elemento que representa o corpo do Modal
  modalBody = document.getElementById("modalBody");

  // Alterando a renderização do Modal
  modalBody.style.display = "none";
}

let enableValidation = () => {
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

          setTimeout(() => {
            closeLoadingSendForm();
          }, 3000);        
      }    
  });
}

let showLoadingSendForm = () => {
  console.log('showLoadingSendForm')

  document.getElementById('submitForm').style.display = "none";
  document.getElementById('containerLoadingSendForm').style.display = "flex";
  document.getElementById('userName').disabled = true;
  document.getElementById('userEmail').disabled = true; 
  document.getElementById("sendFormStatus").innerHTML = 'Enviando dados...'
}

let closeLoadingSendForm = () => {
  nameData = '';
  emailData= ''; 

  document.getElementById("sendFormStatus").innerHTML = 'Dados enviados!'

  setTimeout(() => {
    closeModalAdoption();
  }, 2000);
}