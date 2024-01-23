import {readFile, writeFile} from 'node:fs/promises'
import {getDate, monSecret} from "./divers.js";
import {NotFoundError} from "./errors.js";
import {createHash} from 'node:crypto'
import { v4 as uuidv4 } from 'uuid';

/* Chemin de stockage des blocks */
const path = './data/blockchain.json'

/**
 * Mes définitions
 * @typedef { id: string, nom: string, don: number, date: string,hash: string} Block
 * @property {string} id
 * @property {string} nom
 * @property {number} don
 * @property {string} date
 * @property {string} string
 *
 */

/**
 * Renvoie un tableau json de tous les blocks
 * @return {Promise<any>}
 */
export async function findBlocks() {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf8').then((response) => {
            resolve(JSON.parse(response))
        }).catch((err) => {
            reject(err)
        })
    })

}

/**
 * Trouve un block à partir de son id
 * @param partialBlock
 * @return {Promise<Block[]>}
 */
export async function findBlock(partialBlock) {
    // A coder
}

/**
 * Trouve le dernier block de la chaine
 * @return {Promise<Block|null>}
 */
export async function findLastBlock() {
    // A coder
}

/**
 * Creation d'un block depuis le contenu json
 * @param contenu
 * @return {Promise<Block[]>}
 */
export async function createBlock(contenu) {
    const id = uuidv4()
    const date = getDate()
    const nom = contenu.nom
    const don = contenu.don

    let blocks = await findBlocks()
    let block = {
        "id": id,
        "nom": nom,
        "don": don,
        "date": date
    }
    blocks = [...blocks, block]

    return new Promise((resolve) => {

        writeFile(path, JSON.stringify(blocks), 'utf-8').then((response) => {
            resolve(response)
        })

    })
}

