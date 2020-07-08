const nodeCrypto = require('crypto');

window.crypto = {
  getRandomValues: buffer => nodeCrypto.randomFillSync(buffer),
};
