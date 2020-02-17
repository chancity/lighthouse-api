export default {
    port: process.env.PORT || 3001,
    releaseVersion: process.env.RELEASE_VERSION || 'NOT SET',
    newRelicApiKey: process.env.NEW_RELIC_API_KEY,
    applicationLogFormat: process.env.APPLICATION_LOG_FORMAT || '[HH:MM:ss.l]',
    apiLogFormat: process.env.API_LOG_FORMART || ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent - :response-time ms'
}
