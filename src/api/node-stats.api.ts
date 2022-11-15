import { Request, Response } from "express";
import { client } from "../configuration/config";

/**
* Node statistics
*/
export async function stats(req: Request, res: Response) {

    let awsClient = await client();
    awsClient.nodes.stats((error : any, result : any) => {
        if (error) {
            res.status(error.statusCode).json(error);
        } else {
            res.status(result.statusCode).json(result.body);
        }
    });
};
