const LEVELS = { info: '🟢', warn: '🟡', error: '🔴', debug: '🔵' };

export const logger = {
  info: (msg) => console.log(`${LEVELS.info} [INFO]  ${new Date().toISOString()} — ${msg}`),
  warn: (msg) => console.warn(`${LEVELS.warn} [WARN]  ${new Date().toISOString()} — ${msg}`),
  error: (msg) => console.error(`${LEVELS.error} [ERROR] ${new Date().toISOString()} — ${msg}`),
  debug: (msg) => process.env.DEBUG && console.log(`${LEVELS.debug} [DEBUG] ${new Date().toISOString()} — ${msg}`),
};
