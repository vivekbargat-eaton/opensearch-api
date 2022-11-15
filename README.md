# Api to search documents from OpenSearch® using NodeJS
==================================================================================

Prerequisites
-------------

To run examples from this repository you'll need:

1. An OpenSearch cluster. You can `set it up manually <https://opensearch.org/downloads.html>`.
2. NodeJS and npm. If you don’t have NodeJS or npm installed, follow `these instructions <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>`_.

Running locally
---------------

1. Clone the repository and install the dependencies::

    npm install

2. Provide details in .env about your OpenSearch cluster.

3. npx tsc

4. npm start

You're all set! Retrieve the list of available indices by  

    http://localhost:3000/api/getIndices


Structure of this repository
----------------------------

`index.api` - working with index, get indexes, delete index and get mapping (fields) of an index

`cluster-health.api` - get health of cluster

`node-stats.api` - get node statistics

`search.ts` - examples of different types of search queries

`aggregate.ts` - examples of different types of aggregation queries

`config.ts` and `helpers.ts` contain operations required to connect to the cluster and log responses.


License
-------

This work is licensed under the Apache License, Version 2.0. Full license text is available in the LICENSE file and at http://www.apache.org/licenses/LICENSE-2.0.txt





