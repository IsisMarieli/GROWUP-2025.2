import { Database } from './database.js'
import { randomUUID } from 'node:crypto' // UUID => Unique Universal ID
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

// Route parameters = parametros enviados na propria URL
// request body = informações enviadas no corpo da requisição
// query parameters = paginação/ filtragens 

export const routes = [
  {
    method: 'GET', // Buscar/Listar
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query

      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null)

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST', // Criar
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body

      const user = {
        id: randomUUID(),
        name,
        email,
      }

      database.insert('users', user)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT', // Atualizar
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params // desestruturação
      const { name, email } = req.body 

      database.update('users', id,{
        name,
        email
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE', // Excluir
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params // desestruturação 

      database.delete('users', id)

      return res.writeHead(204).end()
    }
  }
]