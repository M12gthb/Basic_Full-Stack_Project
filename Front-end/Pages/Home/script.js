let token = localStorage.getItem("TOKEN")
let id = localStorage.getItem("ID")

// Verifica se o usuário está logado e redireciona

function verifyToken(){
    switch (token){
        case (!token):
            window.location("/")
        break
        case (token == ""): 
            window.location("/")
        break
    }       
}


verifyToken()