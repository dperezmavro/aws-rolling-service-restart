import opts from 'options'
import {
  restartService,
  getServicesInclusters
} from './restart-service.js'

const main = async () => {

  opts.parse(process.argv)

  if(!opts.service || !opts.cluster){
    const res = await getServicesInclusters()
    console.log("[+] Result: ", res)

    opts.help()
    process.exit(1)
  }

  restartService(opts.cluster, opts.service)
}

main()
