require('dotenv').config();

module.exports = {
  substrateNetwork: process.env.SUBSTRATE_NETWORK || 'kusama',
  wsProviderUrl: process.env.WS_PROVIDER_URL || 'ws://substrate-node:9944',
  postgresConnParams: {
    user: process.env.POSTGRES_USER || 'council_batsignal',
    host: process.env.POSTGRES_HOST || 'postgres',
    database: process.env.POSTGRES_DATABASE || 'council_batsignal',
    password: process.env.POSTGRES_PASSWORD || 'council_batsignal',
    port: process.env.POSTGRES_PORT || 5432,
  },
  crawlers: [
    {
      enabled: !process.env.CRAWLER_BLOCK_LISTENER_DISABLE,
      // eslint-disable-next-line global-require
      module: require('./lib/crawlers/blockListener'),
    },
    {
      enabled: !process.env.CRAWLER_BLOCK_HARVESTER_DISABLE,
      // eslint-disable-next-line global-require
      module: require('./lib/crawlers/blockHarvester'),
      config: {
        startDelay: 60 * 1000,
        pollingTime:
          parseInt(process.env.CRAWLER_BLOCK_LISTENER_POLLING_TIME_MS, 10)
          || 60 * 60 * 1000,
      },
    },
    {
      enabled: !process.env.CRAWLER_NOTIFICATIONS_DISABLE,
      // eslint-disable-next-line global-require
      module: require('./lib/notifications/notifications'),
      config: {
        startDelay: 60 * 1000,
        pollingTime:
          parseInt(process.env.CRAWLER_NOTIFICATIONS_POLLING_TIME_MS, 10)
          || 30 * 1000,
      },
    },
  ],
};
