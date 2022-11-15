import { client, indexName as index, indexName } from "../configuration/config";
import { Helper } from "../helpers/helpers";

export class Index {

  /**
   * Getting list of indices
   */
  static async getIndices() {
    console.log(`Getting existing indices:`);
    let awsClient = await client();
    awsClient.cat.indices({ format: "json" }, Helper.logBody);
  };

  /**
   * Retrieving mapping for the index.
   */
  static async getMapping() {
    console.log(`Retrieving mapping for the index with name ${indexName}`);

    let awsClient = await client();
    awsClient.indices.getMapping({ index: indexName }, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result.body.recipes.mappings.properties);
      }
    });
  };

  /**
   * Deleting the index
   */
  static async delete(index: any) {

    let awsClient = await client();

    awsClient.indices.delete(
      {
        index: index || indexName,
      },
      Helper.logBody
    );
  };
}
