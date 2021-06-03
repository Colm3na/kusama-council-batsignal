const pino = require('pino');

const logger = pino();
const loggerOptions = {
  crawler: 'notifications',
};

module.exports = {
  start: async (wsProviderUrl, pool, config) => {
    logger.info(loggerOptions, 'Starting notifications crawler...');

    const sql = `SELECT
      block_number,
      extrinsic_index,
      is_signed,
      signer,
      section,
      method,
      args,
      hash,
      doc,
      success,
    FROM system_remark WHERE processed IS FALSE;`;
    const res = await pool.query(sql);
    if (res.rows.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const row of res.row) {
        const remark = {
          blockNumber: row.block_number,
          extrinsicIndex: row.extrinsic_index,
          isSigned: row.is_signed,
          signer: row.signer,
          section: row.section,
          method: row.method,
          args: row.args,
          hash: row.hash,
          doc: row.doc,
          success: row.success,
        };
        // eslint-disable-next-line no-await-in-loop
        await module.exports.processSystemRemark(pool, remark);
      }

      logger.info(loggerOptions, `Next execution in ${(config.pollingTime / 1000).toFixed(0)}s...`);
      setTimeout(
        () => module.exports.start(wsProviderUrl, pool, config),
        config.pollingTime,
      );
    }
  },
  processSystemRemark: async (pool, remark) => {
    logger.info(loggerOptions, `Processing remark block ${remark.blockNumber} and extrinsic ${remark.extrinsicIndex} ...`);
    // TODO: Check council system remark constraints

    // TODO: Send notification if contrainsts match

    // TODO: Update processed = true and sent_notification_timestamp in system_remarks table
  },
};
