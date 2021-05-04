# Kusama council batsignal

A notifications-only app to help council members know once they are needed to push forward voting and emergency mechanisms on-chain.



## Install

Install mono-repo:

```
git clone https://github.com/Colm3na/kusama-council-batsignal.git
cd kusama-council-batsignal
yarn
```

### Backend

You will need `nodejs`, `docker` and `docker-compose`:

```
yarn workspace backend docker
```

That will build and start all the required dockers automagically:

- PostgreSQL
- Hasura GraphQL server
- Parity Polkadot client
- Nodejs crawler

Once the node is synced the crawler will start to listen to new blocks, extrinsics and module events and will harvest them from current block height to genesis.

You can access Hasura console at http://server_ip_address:8082, track the new tables and you will be able to query the harvested data using GraphQL.
