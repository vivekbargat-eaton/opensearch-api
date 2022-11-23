import { Request, Response } from "express";
import { Search } from "../modules/search";

export async function match(req: Request, res: Response) {
    let field = JSON.parse(req.params.field);
    let query = JSON.parse(req.params.query);
    let from = JSON.parse(req.params.from);
    let size = JSON.parse(req.params.size);

    try {
        const elasticResponse = await Search.match(field, query, from, size);
        return res.status(elasticResponse.statusCode).send(elasticResponse.body)
    }
    catch (exception) {
        return res.status(500).send(exception);
    }
}

export async function phrase(req: Request, res: Response) {
    let field = JSON.parse(req.params.field);
    let query = JSON.parse(req.params.query);
    let slop = JSON.parse(req.params.slop);
    let from = JSON.parse(req.params.from);
    let size = JSON.parse(req.params.size);

    try {
        const elasticResponse = await Search.phrase(field, query, slop, from, size);
        return res.status(elasticResponse.statusCode).send(elasticResponse.body)
    }
    catch (exception : any) {
        return res.status(exception.statusCode).send(exception.message);
    }
}

export async function queryString(req: Request, res: Response) {
    let field = JSON.parse(req.params.field);
    let query = JSON.parse(req.params.query);
    let from = JSON.parse(req.params.from);
    let size = JSON.parse(req.params.size);

    try {
        const elasticResponse = await Search.queryString(field, query, from, size);
        return res.status(elasticResponse.statusCode).send(elasticResponse.body)
    }
    catch (exception : any) {
        return res.status(exception.statusCode).send(exception.message);
    }
}

export async function term(req: Request, res: Response) {
    let field = JSON.parse(req.params.field);
    let value = JSON.parse(req.params.value);
    let from = JSON.parse(req.params.from);
    let size = JSON.parse(req.params.size);

    try {
        const elasticResponse = await Search.term(field, value, from, size);
        return res.status(elasticResponse.statusCode).send(elasticResponse.body)
    }
    catch (exception : any) {
        return res.status(exception.statusCode).send(exception.message);
    }
}

export async function range(req: Request, res: Response) {
    let field = JSON.parse(req.params.field);
    let gte = JSON.parse(req.params.gte);
    let lte = JSON.parse(req.params.lte);
    let from = JSON.parse(req.params.from);
    let size = JSON.parse(req.params.size);

    try {
        const elasticResponse = await Search.range(field, gte, lte, from, size);
        return res.status(elasticResponse.statusCode).send(elasticResponse.body)
    }
    catch (exception : any) {
        return res.status(exception.statusCode).send(exception.message);
    }
}

export async function luceneSearch(req: Request, res: Response) {
    let query = JSON.parse(req.params.query);
    let from = JSON.parse(req.params.from);
    let size = JSON.parse(req.params.size);

    try {
        const elasticResponse = await Search.luceneSearch(query, from, size);
        return res.status(elasticResponse.statusCode).send(elasticResponse.body)
    }
    catch (exception : any) {
        return res.status(exception.statusCode).send(exception.message);
    }
}


