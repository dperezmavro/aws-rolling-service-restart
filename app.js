import opts from 'options'
import {
  restartService,
  getServicesInclusters
} from 'dist/restart-service.dist.js'

const main = async () => {

  opts.parse(process.argv)

  if(!opts.service || !opts.cluster){
    opts.help()
    process.exit(1)
  }

  restartService(opts.cluster, opts.service)
}

main()
