import React, { useMemo } from 'react';
import T from 'prop-types';
import moment from 'moment';
import LineGraphTooltip from 'components/LineGraphTooltip';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const colors = ['#265EAC', '#00A3CC'];
const chartHeight = 150;

// this is here for the test
const DeviceHistoryChart = ({ data, width }) => {
  const lineData = useMemo(() => {
    const result = [];
    let curr = 0;
    data.forEach(datum => {
      const timestamp = parseInt(datum.createdTimestamp, 10);
      if (timestamp - curr < 120000) {
        result.push({
          timestamp,
          rssi: datum.rssi,
          rx: datum.detailsJSON.averageRxRate,
          tx: datum.detailsJSON.averageTxRate,
        });
      } else {
        result.push({
          timestamp,
          rssi: null,
          rx: null,
          tx: null,
        });
      }
      curr = timestamp;
    });
    return result;
  }, [data]);

  return (
    <>
      <ResponsiveContainer width={width || '100%'} height={chartHeight}>
        <AreaChart
          data={lineData}
          syncId="synced"
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          baseValue={-100}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors[0]} stopOpacity={1} />
              <stop offset="100%" stopColor={colors[0]} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" hide domain={['dataMin', 'dataMax']} scale="time" />
          <YAxis
            orientation="right"
            label={{ value: 'RSSI', angle: 90, position: 'insideRight', stroke: 'white' }}
            domain={[-100, 0]}
            stroke="white"
          />
          <Tooltip content={<LineGraphTooltip />} />
          <Area type="monotone" dataKey="rssi" stroke={colors[0]} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer width={width || '100%'} height={chartHeight}>
        <AreaChart
          data={lineData}
          syncId="synced"
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors[1]} stopOpacity={1} />
              <stop offset="100%" stopColor={colors[1]} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" hide domain={['dataMin', 'dataMax']} scale="time" />
          <YAxis
            orientation="right"
            label={{ value: 'Rx Bytes', angle: 90, position: 'insideRight', stroke: 'white' }}
            domain={[0, 1000]}
            stroke="white"
          />
          <Tooltip content={<LineGraphTooltip />} />
          <Area type="monotone" dataKey="rx" stroke={colors[1]} fill="url(#colorUv2)" />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer width={width || '100%'} height={chartHeight + 70}>
        <AreaChart
          data={lineData}
          syncId="synced"
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUv3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors[0]} stopOpacity={1} />
              <stop offset="100%" stopColor={colors[0]} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tickFormatter={timestamp => moment(timestamp).format('h:mm a')}
            domain={['dataMin', 'dataMax']}
            scale="time"
            stroke="white"
          />
          <YAxis
            orientation="right"
            label={{ value: 'Tx Bytes', angle: 90, position: 'insideRight', stroke: 'white' }}
            domain={[0, 1000]}
            stroke="white"
          />
          <Tooltip content={<LineGraphTooltip />} />
          <Area type="monotone" dataKey="tx" stroke={colors[0]} fill="url(#colorUv3)" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

DeviceHistoryChart.propTypes = {
  data: T.instanceOf(Object),
  width: T.number,
};

DeviceHistoryChart.defaultProps = {
  data: {},
  width: null,
};

export default DeviceHistoryChart;
