
export class Helper {
    /**
    * Logging result body, used in callbacks.
    */
    static logBody(error: any, result: any): void {
        if (error) {
            console.error(error);
        } else {
            console.log(result.body);
        }
    }

    /**
    * Parsing and logging list of titles from the result, used in callbacks.
    */
    static logTitles(error: any, result: any) {
        if (error) {
            console.error(error);
        } else {
            const hits = result.body.hits.hits;
            console.log(hits);
            // console.log(hits.map((hit: { _source: { title: any; }; }) => hit._source.title));
        }
    };

    static logAggs(field: any, error: any, result: any) {
        if (error) {
            console.error(error);
        } else {
            console.log(result.body.aggregations[field]);
        }
    };

    static logResultBody(error: any, result: any) {
        if (error) {
            console.error(error);
        } else {
            console.log(result.body);
        }
    };
}


