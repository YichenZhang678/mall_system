import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Statistic, Tabs, Radio, Space, List } from 'antd';
import React, { useState } from 'react';
import { DollarOutlined, InfoCircleOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [timeRange, setTimeRange] = useState('today');

  // 门店销售额排名数据（使用真实中国城市）
  const storeRankingData = [
    { rank: 1, name: '北京朝阳店' },
    { rank: 2, name: '上海浦东店' },
    { rank: 3, name: '广州天河店' },
    { rank: 4, name: '深圳南山店' },
    { rank: 5, name: '杭州西湖店' },
    { rank: 6, name: '成都锦江店' },
    { rank: 7, name: '武汉江汉店' },
  ];

  // 不同时间范围的数据
  const getChartData = () => {
    if (activeTab === 'sales') {
      // 销售额数据
      switch (timeRange) {
        case 'today':
          // 今日：24小时数据
          return {
            xAxis: Array.from({ length: 24 }, (_, i) => `${i}时`),
            data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 200) + 50),
            yAxisMax: 300,
          };
        case 'week':
          // 本周：7天数据
          return {
            xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            data: [650, 720, 580, 890, 950, 1100, 980],
            yAxisMax: 1200,
          };
        case 'month':
          // 本月：30天数据
          return {
            xAxis: Array.from({ length: 30 }, (_, i) => `${i + 1}日`),
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 400) + 300),
            yAxisMax: 800,
          };
        case 'year':
        default:
          // 全年：12个月数据
          return {
            xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            data: [1150, 650, 950, 480, 980, 400, 550, 380, 1180, 320, 980, 1000],
            yAxisMax: 1200,
          };
      }
    } else {
      // 访问量数据
      switch (timeRange) {
        case 'today':
          // 今日：24小时数据
          return {
            xAxis: Array.from({ length: 24 }, (_, i) => `${i}时`),
            data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 300) + 200),
            yAxisMax: 600,
          };
        case 'week':
          // 本周：7天数据
          return {
            xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            data: [850, 920, 780, 1090, 1150, 1300, 1180],
            yAxisMax: 1400,
          };
        case 'month':
          // 本月：30天数据
          return {
            xAxis: Array.from({ length: 30 }, (_, i) => `${i + 1}日`),
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 500) + 400),
            yAxisMax: 1000,
          };
        case 'year':
        default:
          // 全年：12个月数据
          return {
            xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            data: [1150, 640, 950, 480, 980, 400, 550, 380, 1180, 320, 980, 1000],
            yAxisMax: 1200,
          };
      }
    }
  };

  const chartData = getChartData();

  // 访问量面积图数据（用于顶部卡片）
  const visitData = Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}日`,
    value: Math.floor(Math.random() * 500) + 800,
  }));

  // 支付笔数柱状图数据（用于顶部卡片）
  const paymentData = Array.from({ length: 7 }, (_, i) => ({
    day: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'][i],
    value: Math.floor(Math.random() * 200) + 800,
  }));

  // 销售额类别占比数据
  const categoryData = [
    { name: '服装', value: 35 },
    { name: '配饰', value: 25 },
    { name: '美妆', value: 20 },
    { name: '家居', value: 15 },
    { name: '其他', value: 5 },
  ];

  // 搜索用户数趋势数据
  const searchUserTrendData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 200) + 1000);

  // 人均搜索次数趋势数据
  const avgSearchTrendData = Array.from({ length: 20 }, () => Math.random() * 1 + 2);

  // 访问量面积图配置
  const visitChartOption = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      data: visitData.map(item => item.date),
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: visitData.map(item => item.value),
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#722ed1' },
              { offset: 1, color: 'rgba(114, 46, 209, 0.1)' },
            ],
          },
        },
        lineStyle: {
          color: '#722ed1',
          width: 2,
        },
        symbol: 'none',
      },
    ],
  };

  // 支付笔数柱状图配置
  const paymentChartOption = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      data: paymentData.map(item => item.day),
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: paymentData.map(item => item.value),
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          color: '#1890ff',
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  // 销售/访问趋势柱状图配置（根据选择动态变化）
  const trendChartOption = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: chartData.xAxis,
      axisLine: {
        lineStyle: {
          color: '#d9d9d9',
        },
      },
    },
    yAxis: {
      type: 'value',
      max: chartData.yAxisMax,
      axisLine: {
        lineStyle: {
          color: '#d9d9d9',
        },
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0',
        },
      },
    },
    series: [
      {
        data: chartData.data,
        type: 'bar',
        barWidth: timeRange === 'today' ? '80%' : timeRange === 'week' ? '60%' : '50%',
        itemStyle: {
          color: '#1890ff',
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  // 饼图配置
  const pieChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '销售额',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: '{b}: {d}%',
        },
        data: categoryData,
      },
    ],
  };

  // 搜索用户数趋势小图表
  const searchUserTrendOption = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 20 }, (_, i) => i),
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: searchUserTrendData,
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#1890ff',
          width: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
              { offset: 1, color: 'rgba(24, 144, 255, 0.05)' },
            ],
          },
        },
        symbol: 'none',
      },
    ],
  };

  // 人均搜索次数趋势小图表
  const avgSearchTrendOption = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 20 }, (_, i) => i),
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: avgSearchTrendData,
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#1890ff',
          width: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
              { offset: 1, color: 'rgba(24, 144, 255, 0.05)' },
            ],
          },
        },
        symbol: 'none',
      },
    ],
  };

  return (
    <PageContainer
      header={{
        title: 'Dashboard',
        breadcrumb: {},
      }}
    >
      <Row gutter={[16, 16]}>
        {/* 卡片1: 总销售额 */}
        <Col xs={24} sm={24} md={8}>
          <Card style={{ height: '230px' }}>
            <div style={{ position: 'relative', height: '100%' }}>
              <InfoCircleOutlined
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: '#8c8c8c',
                  fontSize: '16px',
                }}
              />
              <Statistic
                title="总销售额"
                value={126560}
                prefix={<DollarOutlined />}
                suffix=""
                valueStyle={{ color: '#262626', fontSize: '24px', fontWeight: 'bold' }}
              />
              <div style={{ marginTop: '16px', fontSize: '14px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#cf1322' }}>周同比 12% ▲</span>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#3f8600' }}>日同比 11% ▾</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* 卡片2: 访问量 */}
        <Col xs={24} sm={24} md={8}>
          <Card style={{ height: '230px' }}>
            <div style={{ position: 'relative', height: '100%' }}>
              <InfoCircleOutlined
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: '#8c8c8c',
                  fontSize: '16px',
                }}
              />
              <Statistic
                title="访问量"
                value={8846}
                valueStyle={{ color: '#262626', fontSize: '24px', fontWeight: 'bold' }}
              />
              <div style={{ height: '100px', marginTop: '12px' }}>
                <ReactECharts
                  option={visitChartOption}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>
              <div style={{ marginTop: '8px', color: '#8c8c8c', fontSize: '14px' }}>
                日访问量 1,234
              </div>
            </div>
          </Card>
        </Col>

        {/* 卡片3: 支付笔数 */}
        <Col xs={24} sm={24} md={8}>
          <Card style={{ height: '230px' }}>
            <div style={{ position: 'relative', height: '100%' }}>
              <InfoCircleOutlined
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: '#8c8c8c',
                  fontSize: '16px',
                }}
              />
              <Statistic
                title="支付笔数"
                value={6560}
                valueStyle={{ color: '#262626', fontSize: '24px', fontWeight: 'bold' }}
              />
              <div style={{ height: '100px', marginTop: '12px' }}>
                <ReactECharts
                  option={paymentChartOption}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>
              <div style={{ marginTop: '8px', color: '#8c8c8c', fontSize: '14px' }}>
                转化率 60%
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 销售趋势和排名区域 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {/* 左侧：销售趋势图表 */}
        <Col xs={24} lg={16}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  { key: 'sales', label: '销售额' },
                  { key: 'visits', label: '访问量' },
                ]}
              />
              <Radio.Group value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                <Radio.Button value="today">今日</Radio.Button>
                <Radio.Button value="week">本周</Radio.Button>
                <Radio.Button value="month">本月</Radio.Button>
                <Radio.Button value="year">全年</Radio.Button>
              </Radio.Group>
            </div>
            <div style={{ height: '350px' }}>
              <ReactECharts
                option={trendChartOption}
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            </div>
          </Card>
        </Col>

        {/* 右侧：门店销售额排名 */}
        <Col xs={24} lg={8}>
          <Card title="门店销售额排名">
            <List
              dataSource={storeRankingData}
              renderItem={(item) => (
                <List.Item>
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '24px',
                        height: '24px',
                        lineHeight: '24px',
                        textAlign: 'center',
                        borderRadius: '4px',
                        backgroundColor: item.rank <= 3 ? '#1890ff' : '#f0f0f0',
                        color: item.rank <= 3 ? '#fff' : '#262626',
                        marginRight: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.rank}
                    </span>
                    <span>{item.name}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* 线上热门搜索和销售额类别占比 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {/* 左侧：线上热门搜索 */}
        <Col xs={24} lg={12}>
          <Card title="线上热门搜索">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                    12,321
                  </div>
                  <div style={{ fontSize: '14px', color: '#8c8c8c', marginBottom: '8px' }}>
                    搜索用户数
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#cf1322' }}>17.1% ▲</span>
                  </div>
                  <div style={{ height: '60px' }}>
                    <ReactECharts
                      option={searchUserTrendOption}
                      style={{ height: '100%', width: '100%' }}
                      opts={{ renderer: 'svg' }}
                    />
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                    2.7
                  </div>
                  <div style={{ fontSize: '14px', color: '#8c8c8c', marginBottom: '8px' }}>
                    人均搜索次数
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#3f8600' }}>26.2% ▼</span>
                  </div>
                  <div style={{ height: '60px' }}>
                    <ReactECharts
                      option={avgSearchTrendOption}
                      style={{ height: '100%', width: '100%' }}
                      opts={{ renderer: 'svg' }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 右侧：销售额类别占比 */}
        <Col xs={24} lg={12}>
          <Card title="销售额类别占比">
            <div style={{ fontSize: '14px', color: '#8c8c8c', marginBottom: '16px' }}>
              销售额
            </div>
            <div style={{ height: '250px' }}>
              <ReactECharts
                option={pieChartOption}
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
