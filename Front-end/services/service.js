const URL = "http://localhost:3000"

// Buscando usuários

export async function getUsers() {
    
        const response = await fetch(`${URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

         if(!response.ok){
            return response.error
        }
        
        return response.json()
    
}

export async function getUserById(id) {

        const response = await fetch(`${URL}/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!response.ok){
            return response.error
        }
        
        return response.json()
}

// Criando usuários

export async function createUser(obj) {
     const response = await fetch(`${URL}/users`, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!response.ok){
            return response.error
        }
        
        return response.json()
}

// Atualizando usuários

export async function updateUser(id, obj, token) {
     const response = await fetch(`${URL}/users/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if(!response.ok){
            return response.error
        }
        
        return response.json()
}

// Deletando usuário
export async function deleteUser(id, token) {
     const response = await fetch(`${URL}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if(!response.ok){
            return response.error
        }
        
        return response.json()
}

// Verificando Token

export async function verifyToken(page){
    let token = localStorage.getItem("TOKEN")
    let id = localStorage.getItem("ID")
    const user = await getUserById(id)

    switch(page){
        case "home":
            if (!token){
                window.location.assign("/")
            }
            else if(token == ""){
                window.location.assign("/")
            }
            else if (!user){
                window.location.assign("/")
            }
        break
        case "register":
            if (token){
               window.location.assign("../Home/home.html")
            }
            else if(token == ""){
                localStorage.removeItem("TOKEN")
                localStorage.removeItem("ID")
            }
            else if (user){
                window.location.assign("../Home/home.html")
            }
        break
    }
}

// Função de login

export async function login(obj){
    const response = await fetch(`${URL}/login`, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!response.ok){
            return response.error
        }
        
        return response.json()
}

