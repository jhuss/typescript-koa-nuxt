module.exports = env => {
  let nodeEnv = 'dev'
  if (env && 'NODE_ENV' in env && env.NODE_ENV === 'production') nodeEnv = 'prod'
  return require(`./webpack.config.${nodeEnv}.js`)
}
