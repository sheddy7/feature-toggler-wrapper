import LaunchDarkly from 'ldclient-node';

let ldClient = null;

const setupLdClient = (key) => {
  console.log('here')
  ldClient = LaunchDarkly.init(key);

  return new Promise((resolve, reject) => {
    ldClient.once('ready', () => {
      resolve();
    });
  });
};

const getFeatureFlag = (flag, user) => {

  if (!ldClient) reject('Launch Darkly client not initialised');

  new Promise((resolve, reject) => {
    ldClient.variation(flag, user, false, (err, showFeature) => {

      if (err) reject('on noes');
      console.log(showFeature);
      if (showFeature) {
        resolve('flag on!');
      } else {
        resolve('flag off!');
      }
    });
  })
  .then((response) => response)
  .catch((error) => error)
};

const launchDarklyAdaptor = {
  setupLdClient,
  getFeatureFlag
};

export default launchDarklyAdaptor;