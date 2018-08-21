import express from 'express';
import Rox from 'rox-node';
import launchDarklyAdaptor from './lib/launchDarklyAdaptor';

import config from './config.json';

const PORT = 3000;

const flag = 'testFlag';
const roxFlags = {
  [flag]: new Rox.Flag()
};

const app = express();

app.set('port', PORT);

app.get('/api/feature-flags', (req, res) => {
  const user = { key: 'user@test.com' };

  const response = launchDarklyAdaptor.getFeatureFlag(flag, user);
console.log(response);
  res.send(response);
});

app.get('/api/rox-flag', (req, res) => {
  res.send(roxFlags.testFlag.isEnabled());
})

app.get('/', (req, res) => {
  res.send('Feature flag wrapper running');
});

app.listen(PORT, () => {
  switch (config.provider) {
    case 'rox':
      Rox.register('roxFlags', roxFlags);
      Rox.setup(config.setupKeys.rox);
      break;
    case 'launchDarkly':
    console.log('sup');
      launchDarklyAdaptor.setupLdClient(config.setupKeys.launchDarkly).then(() => {});
      break;
  }
});