import { Request, Response } from "express";
import { client, indexName } from "../configuration/config";

/**
* Health of cluster
*/
export async function health(req: Request, res: Response) {

    let awsClient = await client();
    awsClient.cluster.health((error : any, result : any) => {
        if (error) {
            res.status(error.statusCode).json(error);
        } else {
            res.status(result.statusCode).json(result.body);
        }
    });
};
