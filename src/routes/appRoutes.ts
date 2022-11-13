import { Router } from "express";
import { health } from "../api/cluster-health.api";
import { deleteIndex, getIndices, getMapping } from "../api/index.api";
import { stats } from "../api/node-stats.api";
import { match, phrase, queryString, range, term } from "../api/search.api";

export function initializeRoute(): Router {
    let serviceRoutes: Router = Router();

    // Cluster Health
    serviceRoutes.get("/health", health);

     // Node Statistics
     serviceRoutes.get("/stats", stats);

    // Analytics Search
    serviceRoutes.get("/match/:field/:query", match);
    serviceRoutes.get("/phrase/:field/:query/:slop", phrase);
    serviceRoutes.get("/queryString/:field/:query", queryString);
    serviceRoutes.get("/range/:field/:gte/:lte", range);

    // Basic Search
    serviceRoutes.get("/term/:field/:value", term);

    // Indexes
    serviceRoutes.get("/getIndices", getIndices);
    serviceRoutes.get("/getMapping/:index", getMapping);
    serviceRoutes.delete("/delete/:index", deleteIndex);

    

    return serviceRoutes;
}