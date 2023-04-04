//  ativar/desativar menu hamburguer
function isChecked() {
    const checkboxMenu = document.getElementById('checkbox-menu')
    const listMenu = document.getElementsByTagName('ul')[0]

    if (checkboxMenu.checked) {
        listMenu.style.left = '1rem'
    } else {
        listMenu.style.left = '-1000px'
    }
}

//criando uma função para subir para o topo da página
function toTop() {
    window.scrollTo(0, 0)
}