const URL = "https://fake-api-steel.vercel.app"

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