import { Request, Response } from "express";
import { Search } from "../modules/search";

export async function match(req: Request, res: Response) {
    let field = JSON.parse(req.params.field);
    let query = JSON.parse(req.params.query);

    try {
        const elasticResponse = await Search.match(field, query);

        if (elasticResponse.statusCode == 200 && elasticResponse.body?.hits?.hits?.length > 0)
            return res.status(200).send(elasticResponse.body.hits.hits)

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

    try {
        const elasticResponse = await Search.phrase(field, query, slop);

        if (elasticResponse.statusCode == 200 && elasticResponse.body?.hits?.hits?.length > 0)
            return res.status(200).send(elasticResponse.body.hits.hits)

        return res.status(elasticResponse.statusCode).send(elasticResponse.body)
    }
    catch (exception : any) {
        return res.status(exception.statusCode).send(exception.message);
    }
}

export async function queryString(req: Request, res: Response) {
    let field = JSON.parse(req.params.field);
    let query = JSON.parse(req.params.query);

    try {
        const elasticResponse = await Search.queryString(field, query);

        if (elasticResponse.statusCode == 200 && elasticResponse.body?.hits?.hits?.length > 0)
            return res.status(200).send(elasticResponse.body.hits.hits)

        return res.status(elasticResponse.statusCode).send(elasticResponse.body)
    }
    catch (exception : any) {
        return res.status(exception.statusCode).send(exception.message);
    }
}

export async function term(req: Request, res: Response) {
    let field = JSON.parse(req.params.field);
    let value = JSON.parse(req.params.value);

    try {
        const elasticResponse = await Search.term(field, value);

        if (elasticResponse.statusCode == 200 && elasticResponse.body?.hits?.hits?.length > 0)
            return res.status(200).send(elasticResponse.body.hits.hits)

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

    try {
        const elasticResponse = await Search.range(field, gte, lte);

        if (elasticResponse.statusCode == 200 && elasticResponse.body?.hits?.hits?.length > 0)
            return res.status(200).send(elasticResponse.body.hits.hits)

        return res.status(elasticResponse.statusCode).send(elasticResponse.body)
    }
    catch (exception : any) {
        return res.status(exception.statusCode).send(exception.message);
    }
}


