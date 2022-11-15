
export class Helper {
  
    static logBody(error: any, result: any): void {
        if (error) {
            console.error(error);
        } else {
            console.log(result.body);
        }
    }

    static logTitles(error: any, result: any) {
        if (error) {
            console.error(error);
        } else {
            const hits = result.body.hits.hits;
            console.log(hits);
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


