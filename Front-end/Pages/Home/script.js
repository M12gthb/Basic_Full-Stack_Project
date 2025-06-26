import { getUserById } from "../../services/service"


// Verifica se o usuário está logado e redireciona
let token = localStorage.getItem("TOKEN")
let id = localStorage.getItem("ID")

if(!token){
    window.location.assign("/")
}
else if(token == ""){
    window.location.assign("/")
}

// Captura as informações do usuário

try {
    getUserById(id)
} catch (error) {
    console.log(error)
    window.location.assign("/")
}

