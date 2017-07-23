import commander from 'commander'

commander
  .version('0.0.1')
  .option('-c, --cluster [val]', 'The cluster name')
  .option('-s, --service [val]', 'The service name')

export default commander
