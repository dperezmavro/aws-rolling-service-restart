import AWS from 'aws-sdk'
AWS.config.update({region:'eu-west-1'});

class Ecs {
  constructor(){
    this.ecs = new AWS.ECS()
  }

  resolution(resolve, reject){
    return (err, data) => {
      if(err){
        reject(err)
      }

      resolve(data)
    }
  }

  listTasks(cluster, serviceName){
    const params = {
      serviceName,
      cluster
    }

    return new Promise((resolve, reject) => {
      this.ecs.listTasks(
        params,
        this.resolution(resolve, reject)
      )
    })
  }

  listServices(cluster, nextToken){
    const params = {
      cluster,
      nextToken
    }

    return new Promise((resolve, reject) => {
      this.ecs.listServices(
        params,
        this.resolution(resolve, reject)
      )
    })
  }

  describeServices(cluster, services){
    const params = {
      cluster,
      services
    }

    return new Promise((resolve, reject) => {
      this.ecs.describeServices(
        params,
        this.resolution(resolve, reject)
      )
    })
  }

  stopTask(cluster, task) {
    const params = {
      cluster,
      task,
      reason: 'ROLLING RESTART MODULE'
    }
    return new Promise((resolve, reject) => {
      this.ecs.stopTask(
        params,
        this.resolution(resolve, reject)
      )
    })
  }

  listClusters() {
    return new Promise((resolve, reject) => {
      this.ecs.listClusters(
        {},
        this.resolution(resolve, reject)
      )
    })
  }
}

export default Ecs
