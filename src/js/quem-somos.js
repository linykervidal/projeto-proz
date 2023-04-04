const form = document.querySelector("form")
const nameInput = document.querySelector("#name")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const jobSelect = document.querySelector("#job")
const messageTextarea = document.querySelector("#message")

form.addEventListener("submit", (event) => {
   event.preventDefault();

   if (nameInput.value === "") {
    alert("Por favor, preencha o seu nome")
    return;
    }
   if (emailInput.value === "") {
    alert("Por favor, preencha o seu email")
    return
    }
    if (!isEmailvalid()) {
        alert('Por favor, preencha o seu email corretamente')
        return
    }

   if(!validatePassword(passwordInput, 7)) {
    alert("A senha precisa ser no mínimo 8 dígitos.")
    return;
   }

   if(jobSelect.value === ""){
    alert("Por favor, selecione a sua situação")
    return;
   }

   if(messageTextarea.value === ""){
    alert("Por favor, escreva uma mensagem.")
    return;
   }
   
   form.submit()
});

function isEmailvalid() {
    return emailInput.value.includes('@') && emailInput.value.includes('.com')
}

function validatePassword(password, minDigits) {
    return password.value.length > minDigits;
}