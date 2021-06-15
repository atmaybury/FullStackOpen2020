const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

// create server
const server = http.createServer(app)

// run server
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT} in ${config.NODE_ENV} mode`)
})
