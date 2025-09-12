// ['search=Diego', 'page=2' ]
// reduce = percorrer array e transformar em outra coisa
// split = Divide uma string em partes
// substr = Extrai parte de uma string

// ['search', 'Isis' ]
// ['page', '2' ]

export function extractQueryParams(query) {
  return query.substr(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=')

    queryParams[key] = value

    return queryParams
  }, {})
}