// middlewares - interceptador

export async function json(req, res) {
    // JSON de entrada 
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try{
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch{
        req.body = null
    }

    // Devolver dados em JSON
    res.setHeader('Content-type', 'application/json')
}