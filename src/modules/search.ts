import {client, indexName as index} from '../configuration/config';

export class Search {
  /**
   * Finding matches sorted by relevance (full-text query)
   * search match title "soups with beer and garlic"
   * search match title "pizza salad and cheese"
   */
  static async match(field: any, query: any, from: number, size: number) {
    const body = {
      from: from,
      size: size,
      query: {
        match: {
          [field]: {
            query,
          },
        },
      },
      sort: [{date: 'desc'}],
    };

    let opensearchClient = await client();

    return new Promise<any>((resolve, reject) => {
      opensearchClient.search({index, body}, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Matching a phrase (full-text query)
   * search phrase title 'pasta with cheese'
   * search phrase title 'milk chocolate cake'
   */
  static async phrase(
    field: any,
    query: any,
    slop: any,
    from: number,
    size: number
  ) {
    const body = {
      from: from,
      size: size,
      query: {
        match_phrase: {
          [field]: {
            query,
            slop,
          },
        },
      },
      sort: [{date: 'desc'}],
    };
    let opensearchClient = await client();

    return new Promise<any>((resolve, reject) => {
      opensearchClient.search({index, body}, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Using special operators within a query string and a size parameter (full-text query)
   * search queryString title '+(dessert | cake) -garlic  (mango | caramel | cinnamon)'
   * search queryString title '+(salad | soup) -broccoli  (tomato | apple)'
   */
  static async queryString(field: any, query: any, from: number, size: number) {
    let body: any;
    if (!field) {
      body = {
        from: from,
        size: size,
        query: {
          query_string: {
            query: query,
          },
        },
        sort: [{date: 'desc'}],
      };
    } else {
      body = {
        from: from,
        size: size,
        query: {
          query_string: {
            default_field: field,
            query,
          },
        },
        sort: [{date: 'desc'}],
      };
    }

    let opensearchClient = await client();

    return new Promise<any>((resolve, reject) => {
      opensearchClient.search({index, body}, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Searching for exact matches of a value in a field (term-level query)
   * search term sodium 0
   */
  static async term(field: any, value: any, from: number, size: number) {
    const body = {
      from: from,
      size: size,
      query: {
        term: {
          [field]: value,
        },
      },
      sort: [{date: 'desc'}],
    };
    let opensearchClient = await client();

    return new Promise<any>((resolve, reject) => {
      opensearchClient.search({index, body}, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Searching for a range of values in a field (term-level query)
   * gt (greater than)
   * gte (greater than or equal to)
   * lt (less than)
   * lte (less than or equal to)
   * search range sodium 0 100
   */
  static async range(
    field: any,
    gte: any,
    lte: any,
    from: number,
    size: number
  ) {
    const body = {
      from: from,
      size: size,
      query: {
        range: {
          [field]: {
            gte,
            lte,
          },
        },
      },
      sort: [{date: 'desc'}],
    };
    let opensearchClient = await client();

    return new Promise<any>((resolve, reject) => {
      opensearchClient.search({index, body}, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Combining several queries together (boolean query)
   */
  static async boolean(from: number, size: number) {
    const body = {
      from: from,
      size: size,
      query: {
        bool: {
          filter: [{range: {rating: {gte: 4}}}],
          must: [
            {match: {categories: 'Quick & Easy'}},
            {match: {title: 'beer'}},
          ],
          should: [{match: {categories: 'Cocktails'}}],
          must_not: {match: {ingredients: 'garlic'}},
        },
      },
      sort: [{date: 'desc'}],
    };

    let opensearchClient = await client();

    return new Promise<any>((resolve, reject) => {
      opensearchClient.search({index, body}, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Lucene Search
   * search  with /api/luceneSearch/"categories:potato AND fat:(>= 5 OR < 10)"/0/5
   */
  static async luceneSearch(query: any, from: number, size: number) {

    let opensearchClient = await client();

    return new Promise<any>((resolve, reject) => {
      opensearchClient.search(
        {
          index: index,
          from: from,
          size: size,
          q: query,
          // sort: [{date: 'desc'}],
        },
        (error: any, result: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}
