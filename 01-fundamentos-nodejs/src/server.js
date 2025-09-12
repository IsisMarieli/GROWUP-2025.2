// const http = require('http') // CommonJS => require
import http from 'node:http' // ESmodule => import/export node:http uso interno do node
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'


// - Criar usuários = POST
// - Listagem usuários = GET
// - Edição de usuários = PUT(atualizar tudo) / PATCH(atualização especifica)
// - Remoção de usuários = DELETE

// Stateful - depende de memoria e Statless - depende de banco de dados
// Cabeçalhos (req/res) => Metadados

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios => http://localhost:3333/users?userId=1&name=Diego
// Route Parameters: Identificação de recurso => GET http://localhost:3333/users/1 e DELETE http://localhost:3333/users/1
// Request Body: Envio de informações de um formulário (HTTPs)

// POST http://localhost:3333/users
// Edição e remoção

const server = http.createServer(async(req, res) => {
    const { method, url } = req

    await json(req,res)

    const route = routes.find(route =>{
        return route.method === method && route.path.test(url)
    })

    if(route){
        const routeParams = req.url.match(route.path)

        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req,res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)