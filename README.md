# Network of Terms Catalog

This is the catalog of datasets that you can query through the
[Network of Terms API](https://github.com/netwerk-digitaal-erfgoed/network-of-terms-api).

The [catalog](catalog/) directory contains all datasets.
Each is described in the [Schema.org](https://schema.org) ontology.

The [queries](catalog/queries/) directory contains SPARQL queries for retrieving terms from the datasets.

## Installation

This package is [available on NPM](https://www.npmjs.com/package/@netwerk-digitaal-erfgoed/network-of-terms-catalog):

```
npm add @netwerk-digitaal-erfgoed/network-of-terms-catalog
```

## Contributing

### Adding a dataset

* Create a `your-dataset.jsonld` file in the `catalog/dataset/` directory and add a description.
* Create a `your-dataset.rq` in the `catalog/queries/` directory to hold the SPARQL query.
* Add your dataset to the `catalog/publishers.jsonld` file, make sure the `@id` property matches the `@id` property of the `creator` section in `your-dataset.jsonld`
* Run the tests to make sure your dataset description conforms to the [dataset SHACL](shacl/dataset.jsonld):
  ```
  npm install
  npm run test
  ```

### Local development

If you’d like to test your development version of the catalog inside
a [network-of-terms-api](https://github.com/netwerk-digitaal-erfgoed/network-of-terms-api) checkout,
you can do so by [linking](https://docs.npmjs.com/cli/link). 

First, make sure you have checked out both this and the API repository:
    
    git clone git@github.com:netwerk-digitaal-erfgoed/network-of-terms-api.git
    git clone git@github.com:netwerk-digitaal-erfgoed/network-of-terms-catalog.git

Next, link the dependency: 

    cd network-of-terms-catalog
    npm link
    cd ../network-of-terms-api
    npm link @netwerk-digitaal-erfgoed/network-of-terms-catalog
    
Before using the catalog in the API, make sure to compile this repository:

    cd network-of-terms-catalog
    npm run compile    

After making changes to the catalog, compiling is not required, just restarting the API service will do.

### Committing changes

This repository follows [Semantic Versioning](https://semver.org). Tags and 
[releases](https://github.com/netwerk-digitaal-erfgoed/network-of-terms-catalog/releases) are
[created automatically](https://github.com/netwerk-digitaal-erfgoed/network-of-terms-catalog/blob/master/.github/workflows/release.yml)
based on commit messages. 
So please make sure to follow the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/#summary)
when committing changes.
