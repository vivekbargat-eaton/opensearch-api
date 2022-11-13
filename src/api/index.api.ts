import { Request, Response } from "express";
import { client, indexName } from "../configuration/config";

/**
* Getting list of indices
*/
export async function getIndices(req: Request, res: Response) {

    let awsClient = await client();
    awsClient.cat.indices({ format: "json" }, (error : any, result : any) => {
        if (error) {
            res.status(error.statusCode).json(error);
        } else {
            res.status(result.statusCode).json(result.body);
        }
    });
};

/**
 * Retrieving mapping for the index.
 */
export async function getMapping(req: Request, res: Response) {
    let indexName = JSON.parse(req.params.index);

    let awsClient = await client();
    awsClient.indices.getMapping({ index: indexName }, (error: any, result: any) => {
        if (error) {
            res.status(error.statusCode).json(error);
        } else {
            res.status(result.statusCode).json(result.body);
        }
    });
};

/**
 * Deleting the index
 */
export async function deleteIndex(req: Request, res: Response) {

    let index = JSON.parse(req.params.index);
    let awsClient = await client();

    awsClient.indices.delete({ index: index || indexName },
        (error: any, result: any) => {
            if (error) {
                res.status(error.statusCode).json(error);
            } else {
                res.status(result.statusCode).json(result.body);
            }
        });
};



