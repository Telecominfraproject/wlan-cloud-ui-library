import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { HighchartsChart, withHighcharts, PieSeries, Tooltip } from 'react-jsx-highcharts';
import Highcharts from 'highcharts/highstock';

import { COLORS } from 'utils/charts';
import Card from '../Card';

const PieChart = ({ chartData, title }) => {
  const pieData = useMemo(() => {
    return Object.keys(chartData).map(key => ({
      name: key,
      y: chartData[key],
    }));
  }, [chartData]);

  return (
    <Card title={title}>
      {pieData.length > 0 ? (
        <HighchartsChart colors={COLORS} backgroundColor="none">
          <PieSeries
            name="Count"
            data={pieData}
            size="100%"
            showInLegend
            dataLabels={{ color: '#fff' }}
          />

          <Tooltip borderWidth={0} shadow style={{ fontSize: '12px' }} />
        </HighchartsChart>
      ) : (
        <h4>No Data</h4>
      )}
    </Card>
  );
};

PieChart.propTypes = {
  chartData: PropTypes.instanceOf(Object),
  title: PropTypes.string,
};

PieChart.defaultProps = {
  chartData: {},
  title: '',
};
export default withHighcharts(PieChart, Highcharts);
