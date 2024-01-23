import {createBlock, findBlock, findBlocks, verifBlocks} from "./blockchainStorage.js";
import {json} from "node:stream/consumers"

export async function liste(req, res, url, id) {
    if(id == null)
        return findBlocks()
    else
        return  findBlock(id)
}

export async function create(req, res) {
    return createBlock(await json(req))
}

export async function integrite(req, res) {
    return verifBlocks()
}