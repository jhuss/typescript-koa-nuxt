module.exports = env => {
  let nodeEnv = 'dev'
  if (env.NODE_ENV && env.NODE_ENV === 'production') nodeEnv = 'prod'
  return require(`./webpack.config.${nodeEnv}.js`)
}
