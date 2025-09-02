// const http = require('http') // CommonJS => require
import http from 'http' // ESmodule => import/export 


// - Criar usuários = POST
// - Listagem usuários = GET
// - Edição de usuários = PUT(atualizar tudo) / PATCH(atualização especifica)
// - Remoção de usuários = DELETE

// Stateful - depende de memoria e Statless - depende de banco de dados
// Cabeçalhos (req/res) => Metadados

const users = []

const server = http.createServer((req,res) =>{
    const { method, url } = req

    if(method == 'GET' && url =='/users'){
        return res 
        .setHeader('Content-type','application/json')
        .end(JSON.stringify(users))
    }

    if(method == 'POST' && url =='/users'){
        users.push({
            id: 1,
            name: 'Isis Marieli',
            email: 'isismarieli1@gmail.com',
        })

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)