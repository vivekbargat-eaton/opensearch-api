import * as dotenv from "dotenv";
import { Client, Connection } from "@opensearch-project/opensearch";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import * as aws4 from "aws4";
import { Credentials } from "@aws-sdk/types";

dotenv.config();

let host = process.env.SERVICE_URI; 
let region : string = process.env.REGION ?? '';

const createAwsConnector = (credentials: Credentials, region: string) => {
    class AmazonConnection extends Connection {
        buildRequestObject(params: any) {
            const request: any = super.buildRequestObject(params);
            request.service = 'es';
            request.region = region;
            request.headers = request.headers || {};
            request.headers['host'] = request.hostname;

            return aws4.sign(request, credentials);
        }
    }
    return {
        Connection: AmazonConnection
    };
};

export const client = async () => {
    const credentials = await defaultProvider()();
    return new Client({
        ...createAwsConnector(credentials, region),
        node: host,
    });
};

export const indexName = "recipes";




