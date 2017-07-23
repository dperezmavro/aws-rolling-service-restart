# About

This script will help you do a rolling restart of a service, taking down a container at a time and waiting for a new one to come up, then proceeding with the next container and so on.

# Module Usage

This exports to functions that will be of interest: `restartService` and `getServicesInclusters`.

## restartService

This is an `async` function with signature:

`const restartService = async (cluster, serviceName) => void`

## getServicesInclusters

This is a helper function that will give you a list of clusters with their service names. The function signature for this is:

`const getServicesInclusters = async () =>
  [
    {
      clusterArn: 'someArn',
      serviceArns: [
        'serviceArns',
        'serviceArns2'
      ]
    },
  ]`



# CLI usage

Run `npm install` and then `npm run make` (twice at this point, there's a bug in the build script). This will generate the executable you can run under `./dist/app.dist.js`

You only need to provide the service definition with `--service` and the cluster name with `--cluster`. Both of those can be found in the ECS console.

Example:

`node ./dist/app.dist.js --cluster docker-cluster-dev-22 --service lml-si-hello-service-test-dev-53-ECSService-1XFGS3P5NX0Q4`
