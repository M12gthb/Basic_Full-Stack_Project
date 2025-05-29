# Api de usuário

# Endpoints

| Método | Endpoint   | Responsabilidade                    |
| ------ | ---------- | ----------------------------------- |
| POST   | /login     | Registra o login de um usuário      |
| POST   | /users     | Cria um novo usuário                |
| GET    | /users     | Lista todos os usuários cadastrados |
| GET    | /users/:id | busca o usuário passando por id     |
| PATCH  | /users/:id | Atualiza o usuário passado por id   |
| DELETE | /users/:id | Deleta o usuário passado por id     |

### Endpoints

| Método | Rota   | Descrição                      |
| ------ | ------ | ------------------------------ |
| POST   | /login | Registra o login de um usuário |

### Exemplo de Request:

```
POST /login

```

Content-type: application/json

````

### Corpo da Requisição:

```json
{
  "email": "user@mail.com",
  "password": "Aaa@1234"
}
````

### Exemplo de Response:

```
201 Created
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQG1haWwuY29tIiwiaWF0IjoxNjk2OTc2MDc0LCJleHAiOjE2OTY5ODY4NzQsInN1YiI6IjllMmRmZTc1LTRiNDYtNDgwMi04OGZjLTQxMzNjNjEwOGU5YSJ9.ucQGKjvDFyqplHL_hHujLB1imD4w-lxEttEvpUnjZ5s"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                 |
| ---------------- | ------------------------- |
| 401 Unauthorized | Invalid email or password |

---

### **Criação de Usuário**

### `/users`

| Método | Rota   | Descrição       |
| ------ | ------ | --------------- |
| POST   | /users | Cria um usuário |

### Exemplo de Request:

```
POST /users
```

Host: http://localhost:3000

```
Authorization: None
```

Content-type: application/json

````

### Corpo da Requisição:

```json
{
  "id": "bbf64df3-3c77-42bb-9490-60342a27afbd",
  "name": "teste",
  "email": "teste@mail.com",
  "image": "https://www.techsmith.com/blog/wp-content/uploads/2023/08/What-are-High-Resolution-Images.png",
}
````

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "bbf64df3-3c77-42bb-9490-60342a27afbd",
  "name": "teste",
  "email": "teste@mail.com",
  "image": "https://www.techsmith.com/blog/wp-content/uploads/2023/08/What-are-High-Resolution-Images.png",
  "created_at timestamp": "05/05/2025",
  "updated_at timestamp": "05/05/2025"
}
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 409 Conflict   | User already exists |

| Código do Erro  | Descrição              |
| --------------- | ---------------------- |
| 400 Bad Request | "error": "Bad Request" |

| Código do Erro | Descrição            |
| -------------- | -------------------- |
| 409 Conflict   | Email alredy exist ! |

obs: É necessário que todos os campos sejam passados corretamente.

---

### **Listagem de usuários**

| Método | Rota   | Descrição               |
| ------ | ------ | ----------------------- |
| GET    | /users | Busca todos os usuários |

### `/users`

### Exemplo de Request:

```
GET /users
```

Host: http://localhost:3000

```
Authorization: None
```

Content-type: application/json

```

```

### Exemplo de Response:

```
200 OK
```

```[
{
  "id": "bbf64df3-3c77-42bb-9490-60342a27afbd",
  "name": "teste",
  "email": "teste@mail.com",
  "image": "https://www.techsmith.com/blog/wp-content/uploads/2023/08/What-are-High-Resolution-Images.png",
  "created_at timestamp": "05/05/2025",
  "updated_at timestamp": "05/05/2025"
}
]
```

### **Busca um usuário**

| Método | Rota       | Descrição        |
| ------ | ---------- | ---------------- |
| GET    | /users/:id | Busca um usuário |

### `/users/:id`

### Exemplo de Request:

```
GET /users/bbf64df3-3c77-42bb-9490-60342a27afbd
```

Host: http://localhost:3000

```
Authorization: None
```

Content-type: application/json

```

```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "bbf64df3-3c77-42bb-9490-60342a27afbd",
  "name": "teste",
  "email": "teste@mail.com",
  "image": "https://www.techsmith.com/blog/wp-content/uploads/2023/08/What-are-High-Resolution-Images.png",
  "created_at timestamp": "05/05/2025",
  "updated_at timestamp": "05/05/2025"
}
```

### Possíveis Erros:

| Código do Erro | Descrição      |
| -------------- | -------------- |
| 404 Not Found  | User not found |

### **Atualiza um usuário**

| Método | Rota       | Descrição                    |
| ------ | ---------- | ---------------------------- |
| PATCH  | /users/:id | atualiza dados de um usuário |

### `/users/:id`

### Exemplo de Request:

```
PATCH /users/bbf64df3-3c77-42bb-9490-60342a27afbd

```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "bbf64df3-3c77-42bb-9490-60342a27afbd",
  "name": "teste",
  "email": "teste@mail.com",
  "image": "https://www.techsmith.com/blog/wp-content/uploads/2023/08/What-are-High-Resolution-Images.png",
  "created_at timestamp": "05/05/2025",
  "updated_at timestamp": "05/05/2025"
}
```

### Possíveis Erros:

| Código do Erro | Descrição      |
| -------------- | -------------- |
| 404 Not Found  | User not found |

| Código do Erro   | Descrição            |
| ---------------- | -------------------- |
| 401 Unauthorized | jwt must be provided |

| Código do Erro | Descrição                |
| -------------- | ------------------------ |
| 403 Forbidden  | Insufficient permissions |

| Código do Erro  | Descrição                        |
| --------------- | -------------------------------- |
| 400 Bad Request | Expected string, received number |

### **Atualiza um usuário**

| Método | Rota       | Descrição         |
| ------ | ---------- | ----------------- |
| DELETE | /users/:id | Remove um usuário |

### `/users/:id`

### Exemplo de Request:

```
DELETE /users/bbf64df3-3c77-42bb-9490-60342a27afbd

```

### Exemplo de Response:

```
201 OK NO Content
```

```json

```

### Possíveis Erros:

| Código do Erro | Descrição      |
| -------------- | -------------- |
| 404 Not Found  | User not found |

| Código do Erro   | Descrição            |
| ---------------- | -------------------- |
| 401 Unauthorized | jwt must be provided |

| Código do Erro | Descrição                |
| -------------- | ------------------------ |
| 403 Forbidden  | Insufficient permissions |
