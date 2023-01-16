import http from 'http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js'

// - Criar Ussúario
// - Listagem Usúario
// - Edição Usúario
// - Remoção de Usúario

// - HTTP
//   - Método HTTP
//   - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários no banc-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless

// Cabeçalhos (Requisição/resposta) => Metadados

// HTTP Status Code

 // Query Parameters: URL Stateful => Filtros, paginação , não-obrigatórios
 // Route Parameters: Identificação de recurso
 // Request Body: Enviode informações de um formulário (HTTPs)

 // http://localhost:3333/users?userId=1&name=Allan
 
 // GER http://localhost:3333/users/1
 // DELETE http://localhost:3333/users/1

 // POST http://localhodt:3333/users

const server = http.createServer(async( req, res ) => {
  const { method, url } = req 

  await json(req, res)

  const route = routes.find(route => {
    return route.method == method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups 

    req.params = params 
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(400).end()
})

server.listen(3333) 