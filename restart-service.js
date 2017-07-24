import Ecs from './ecs.js'

const ecs = new Ecs()

const getRunningCount = (cluster, serviceName) => {
  return () => {
    return new Promise(async (resolve, reject) => {
      const {services} = await ecs.describeServices(cluster, serviceName)
      resolve(services[0].runningCount)
    })
  }
}

const getDesiredCount = (cluster, serviceName) => {
  return new Promise(async (resolve, reject) => {
    const {services} = await ecs.describeServices(cluster, serviceName)
    resolve(services[0].desiredCount)
  })
}

const sleep = () => new Promise((res, rej) => {setTimeout(res, 1000)})

const restartService = async (cluster, serviceName) => {
  const desiredCount = await getDesiredCount(cluster, [serviceName])
  const runningCountGen = getRunningCount(cluster, [serviceName])
  const runningCount = runningCountGen()

  const {taskArns} = await ecs.listTasks(cluster, serviceName)

  for(var i = 0 ; i < taskArns.length; i++){
    const res = await ecs.stopTask(cluster, taskArns[i])
    console.log('[+] Stopped: ', res.task)

    while(await runningCountGen() != desiredCount){
      await sleep()
    }
  }
}

const fetchAllServices = (clusterArn) => {
  return new Promise(async (resolve, reject) => {
    let results = []
    let tempRes = await ecs.listServices(clusterArn, null)
    while(tempRes.nextToken){
      results = results.concat(tempRes.serviceArns)
      tempRes = await ecs.listServices(clusterArn, tempRes.nextToken)
    }

    resolve({
      clusterArn,
      serviceArns: results
    })
  })
}

const getServicesInclusters = async () => {
  const {clusterArns} = await ecs.listClusters()

  const results = await Promise.all(
    clusterArns.map(fetchAllServices)
  )

  return results
}

export default restartService

export {
  restartService,
  getServicesInclusters
}
