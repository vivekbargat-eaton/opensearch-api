import * as dotenv from "dotenv";
import { Client, Connection } from "@opensearch-project/opensearch";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import * as aws4 from "aws4";
import { Credentials } from "@aws-sdk/types";
// import { fromSSO } from "@aws-sdk/credential-provider-sso";
import * as fs from "fs";

dotenv.config();

let host = process.env.SERVICE_URI; 
let region : string = process.env.REGION ?? '';
let ca_certs_path : string = process.env.CA_CERTS_PATH ?? '';

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
    // aws credentials
    const credentials = await defaultProvider()();

    // Uncomment this for SSO
    //const credentials = await fromSSO({ profile: "shared-readonly" })();

    // open search client
    return new Client({
        ...createAwsConnector(credentials, region),
        node: host,
        ssl: {
            ca: fs.readFileSync(ca_certs_path),
             // rejectUnauthorized: false
            // You can turn off certificate verification (rejectUnauthorized: false) if you're using self-signed certificates with a hostname mismatch.
            // cert: fs.readFileSync(client_cert_path),
            // key: fs.readFileSync(client_key_path)
          },
    });
};

export const indexName = "recipes";




