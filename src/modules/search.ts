import { client, indexName as index } from "../configuration/config";

export class Search {

  /**
 * Finding matches sorted by relevance (full-text query)
 * run-func search match title "soups with beer and garlic"
 * run-func search match title "pizza salad and cheese"
 */
  static async match(field: any, query: any) {
    const body = {
      query: {
        match: {
          [field]: {
            query,
          },
        },
      },
    };

    let awsClient = await client();

    return new Promise<any>((resolve, reject) => {
      awsClient.search({ index, body }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          // console.log(hits.map((hit: { _source: { title: any; }; }) => hit._source.title));
        }
      });
    });
  }

  /**
   * Matching a phrase (full-text query)
   * run-func search phrase title 'pasta with cheese'
   * run-func search phrase title 'milk chocolate cake'
   */
  static async phrase(field: any, query: any, slop: any) {
    const body = {
      query: {
        match_phrase: {
          [field]: {
            query,
            slop
          },
        },
      },
    };
    let awsClient = await client();

    return new Promise<any>((resolve, reject) => {

      awsClient.search({ index, body }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          // console.log(hits.map((hit: { _source: { title: any; }; }) => hit._source.title));
        }
      });
    });
  };

  /**
   * Using special operators within a query string and a size parameter (full-text query)
   * run-func search queryString title '+(dessert | cake) -garlic  (mango | caramel | cinnamon)'
   * run-func search queryString title '+(salad | soup) -broccoli  (tomato | apple)'
   */
  static async queryString(field: any, query: any) {
    const body = {
      query: {
        query_string: {
          default_field: field,
          query,
        },
      },
    };
    let awsClient = await client();

    return new Promise<any>((resolve, reject) => {
      awsClient.search({ index, body }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          // console.log(hits.map((hit: { _source: { title: any; }; }) => hit._source.title));
        }
      });
    });
  };

  /**
   * Searching for exact matches of a value in a field (term-level query)
   * run-func search term sodium 0
   */
  static async term(field: any, value: any) {
    const body = {
      query: {
        term: {
          [field]: value,
        },
      },
    };
    let awsClient = await client();

    return new Promise<any>((resolve, reject) => {
      awsClient.search({ index, body }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          // console.log(hits.map((hit: { _source: { title: any; }; }) => hit._source.title));
        }
      });
    });
  };

  /**
   * Searching for a range of values in a field (term-level query)
   * gt (greater than)
   * gte (greater than or equal to)
   * lt (less than)
   * lte (less than or equal to)
   * run-func search range sodium 0 100
   */
   static async range(field: any, gte: any, lte: any) {
    const body = {
      query: {
        range: {
          [field]: {
            gte,
            lte,
          },
        },
      },
    };
    let awsClient = await client();

    return new Promise<any>((resolve, reject) => {
      awsClient.search({ index, body }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          // console.log(hits.map((hit: { _source: { title: any; }; }) => hit._source.title));
        }
      });
    });
  };


  /**
   * Combining several queries together (boolean query)
   * run-func search boolean
   */
  static async boolean() {
    const body = {
      query: {
        bool: {
          filter: [{ range: { rating: { gte: 4 } } }],
          must: [
            { match: { categories: "Quick & Easy" } },
            { match: { title: "beer" } },
          ],
          should: [
            { match: { categories: "Cocktails" } },
          ],
          must_not: { match: { ingredients: "garlic" } }
        },
      },
    };

    let awsClient = await client();

    return new Promise<any>((resolve, reject) => {
      awsClient.search({ index, body }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          // console.log(hits.map((hit: { _source: { title: any; }; }) => hit._source.title));
        }
      });
    });
  };

}



