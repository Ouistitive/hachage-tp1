
import {createServer} from "node:http"
import {create, integrite, liste} from "./blockchain.js";
import {NotFoundError} from "./errors.js";

createServer(async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const url = new URL(req.url, `http://${req.headers.host}`)
        const endpoint = `${req.method}:${url.pathname}`

        let results

        try {
            switch (endpoint) {
                case 'GET:/blockchain':
                    const id = url.searchParams.get('id');
                    results = await liste(req, res, url, id)
                    console.log("GET")
                    break
                case 'POST:/blockchain':
                    results = await create(req, res)
                    console.log("POST")
                    break
                case 'GET:/blockchain/integrite':
                    results = await integrite(req, res)
                    console.log("GET")
                    break
                default :
                    res.writeHead(404)
            }
            if (results) {
                res.write(JSON.stringify(results))
            }
        } catch (erreur) {
            if (erreur instanceof NotFoundError) {
                res.writeHead(404)
            } else {
                throw erreur
            }
        }
        res.end()
    }
).listen(3000)
