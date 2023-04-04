let nameData = '';
let emailData = '';

let nameIsValid = false;
let emailIsValid = false;

const usarName = document.getElementById('name');
const spanNameError = document.getElementById('nameError');
const usarEmail = document.getElementById('email');
const spanEmailError = document.getElementById('emailError');
const myForm = document.getElementById('submitForm');
const sendFormStatus = document.getElementById('sendFormStatus');
const modalContent = document.createElement("div");
const modalBody = document.getElementById("modalBody");

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
        usarName.style.color = "black"; 
        usarName.style.border = "2px solid #B65826"; 
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
        usarEmail.style.color = "black"; 
        usarEmail.style.border = "2px solid #B65826"; 
        spanEmailError.style.display = "none";
        spanEmailError.innerHTML = ""; 
    }
});

myForm.addEventListener('click', () => {
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

        showModalSendForm();        

        setTimeout(() => {
            closeModalSendForm();
        }, 3000);        
    }    
});

showModalSendForm = () => {
    // Conteúdo a ser inserido no elemento modalContent
    modalContent.innerHTML = `<div class="modal-content">
        <img 
            src="../img/loading_send_form.gif" 
            class="gif-loading-send-form"  
            alt="Loading" 
        >
        <span id="sendFormStatus" class="sendFormStatus"></span>
    </div>`;  
    
    // Inserindo o conteudo no corpo do Modal
    modalBody.appendChild(modalContent);
    
    // Alterando a renderização do Modal
    modalBody.style.display = "block";

    // Alterando o texto do span 
    document.getElementById("sendFormStatus").innerHTML = 'Enviando dados...'
}

closeModalSendForm = () => {
    // Limpando as variaveis que recebem os dados  dos inputs
    nameData = '';
    emailData= ''; 

    // Alterando a o texto do span 
    document.getElementById("sendFormStatus").innerHTML = 'Dados enviados!'

    setTimeout(() => {
        // Limpando o corpo do Modal
        modalBody.innerHTML = "";
        
        // Desabilitando a renderização do Modal
        modalBody.style.display = "none";     
    }, 2000);
}

