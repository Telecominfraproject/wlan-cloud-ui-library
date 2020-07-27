import _ from 'lodash';

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // eslint-disable-next-line no-restricted-properties
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function formatBitsPerSecond(bps) {
  if (bps >= 1000000000) {
    return `${_.round(bps / 1000000000, 0)} Gbps`;
  }
  if (bps >= 1000000) {
    return `${_.round(bps / 1000000, 0)} Mbps`;
  }
  if (bps >= 2000) {
    return `${_.round(bps / 1000, 0)} Kbps`;
  }

  return `${Math.floor(bps)} bps`;
}
