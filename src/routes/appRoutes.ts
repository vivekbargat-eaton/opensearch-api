import { Router } from "express";
import { health } from "../api/cluster-health.api";
import { deleteIndex, getIndices, getMapping } from "../api/index.api";
import { stats } from "../api/node-stats.api";
import { luceneSearch, match, phrase, queryString, range, term } from "../api/search.api";

export function initializeRoute(): Router {
    let serviceRoutes: Router = Router();

    // Cluster Health
    serviceRoutes.get("/health", health);

     // Node Statistics
     serviceRoutes.get("/stats", stats);

    // Analytics Search
    serviceRoutes.get("/match/:field/:query/:from/:size", match);
    serviceRoutes.get("/phrase/:field/:query/:slop/:from/:size", phrase);
    serviceRoutes.get("/queryString/:field/:query/:from/:size", queryString);
    serviceRoutes.get("/range/:field/:gte/:lte/:from/:size", range);

    // Basic Search
    serviceRoutes.get("/term/:field/:value/:from/:size", term);

     // Lucene Search
     serviceRoutes.get("/luceneSearch/:query/:from/:size", luceneSearch);

    // Indexes
    serviceRoutes.get("/getIndices", getIndices);
    serviceRoutes.get("/getMapping/:index", getMapping);
    serviceRoutes.delete("/delete/:index", deleteIndex);

    

    return serviceRoutes;
}