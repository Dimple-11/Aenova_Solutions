import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Cpu, Server, Activity, ShieldCheck, Zap } from 'lucide-react';
import { analyticsDataMock } from '../../data/mockData';

export const AnalyticsPage: React.FC = () => {
  // AEVONA Palette colors for charts
  const colors = {
    gold: '#D4B483',
    bronze: '#A6815B',
    brown: '#6B4E3A',
    dark: '#2E1F17',
    cream: '#EFE7D5',
    lightGold: '#E6D3B6',
  };

  const pieColors = ['#D4B483', '#A6815B', '#6B4E3A', '#473224'];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          Platform Analytics
        </h1>
        <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">
          Real-time API traffic telemetry, cloud infrastructure throughput, and milestone metrics.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]/80">System Uptime</span>
            <Zap className="w-4 h-4 text-[#D4B483]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB] mt-2">
            {analyticsDataMock.performanceMetrics.uptime}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">SLA Compliant</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]/80">Avg Response Time</span>
            <Activity className="w-4 h-4 text-[#D4B483]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB] mt-2">
            {analyticsDataMock.performanceMetrics.avgResponseMs}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Sub-150ms Performance</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]/80">Tasks Completed</span>
            <TrendingUp className="w-4 h-4 text-[#D4B483]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB] mt-2">
            {analyticsDataMock.performanceMetrics.tasksCompletedThisMonth}
          </div>
          <div className="text-[11px] text-[#A6815B] font-semibold mt-1">+18% vs last month</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]/80">Active Deployments</span>
            <Server className="w-4 h-4 text-[#D4B483]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB] mt-2">
            {analyticsDataMock.performanceMetrics.activeDeployments}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">100% Healthy</div>
        </div>
      </div>

      {/* Main Charts Row 1: API Usage Area Chart + Project Completion Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Usage Area Chart */}
        <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl p-6 shadow-md space-y-4">
          <div>
            <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
              Weekly API Calls & Bandwidth
            </h3>
            <p className="text-xs text-[#6B4E3A]/80 dark:text-[#D4B483]/70">
              Total requests processed across global edge routers.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsDataMock.usageMetrics}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.gold} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colors.gold} stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFE7D5" opacity={0.3} />
                <XAxis dataKey="day" stroke="#6B4E3A" fontSize={11} />
                <YAxis stroke="#6B4E3A" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#2E1F17', color: '#F8F4EB', borderRadius: '12px', border: '1px solid #D4B483' }}
                />
                <Area type="monotone" dataKey="apiCalls" stroke={colors.gold} fillOpacity={1} fill="url(#colorCalls)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Completion Bar Chart */}
        <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl p-6 shadow-md space-y-4">
          <div>
            <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
              Monthly Project Completion Rate
            </h3>
            <p className="text-xs text-[#6B4E3A]/80 dark:text-[#D4B483]/70">
              Completed vs active in-progress initiatives.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsDataMock.projectCompletion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFE7D5" opacity={0.3} />
                <XAxis dataKey="month" stroke="#6B4E3A" fontSize={11} />
                <YAxis stroke="#6B4E3A" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#2E1F17', color: '#F8F4EB', borderRadius: '12px', border: '1px solid #D4B483' }}
                />
                <Bar dataKey="completed" fill={colors.gold} radius={[6, 6, 0, 0]} />
                <Bar dataKey="inProgress" fill={colors.bronze} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Service Distribution Pie + Performance Audit Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl p-6 shadow-md space-y-4">
          <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
            Service Share Breakdown
          </h3>
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsDataMock.serviceDistribution}
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                >
                  {analyticsDataMock.serviceDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#2E1F17', color: '#F8F4EB', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#EFE7D5] dark:border-[#3D2C23]">
            {analyticsDataMock.serviceDistribution.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pieColors[idx] }} />
                  <span className="text-[#2E1F17] dark:text-[#F8F4EB] font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-[#6B4E3A] dark:text-[#D4B483]">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Infrastructure Health Table */}
        <div className="lg:col-span-2 bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl p-6 shadow-md space-y-4">
          <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
            Cloud Node Health & Latency Telemetry
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F4EB] dark:bg-[#1A110B] text-[#6B4E3A] dark:text-[#D4B483] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3">Node Region</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Latency</th>
                  <th className="p-3">Load</th>
                  <th className="p-3">Uptime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7D5] dark:divide-[#3D2C23]">
                <tr>
                  <td className="p-3 font-bold text-[#2E1F17] dark:text-[#F8F4EB]">us-east-1 (N. Virginia)</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">Operational</span></td>
                  <td className="p-3 font-mono">18ms</td>
                  <td className="p-3">34%</td>
                  <td className="p-3">99.99%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#2E1F17] dark:text-[#F8F4EB]">eu-west-1 (Frankfurt)</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">Operational</span></td>
                  <td className="p-3 font-mono">42ms</td>
                  <td className="p-3">52%</td>
                  <td className="p-3">99.98%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#2E1F17] dark:text-[#F8F4EB]">ap-southeast-1 (Singapore)</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">Operational</span></td>
                  <td className="p-3 font-mono">88ms</td>
                  <td className="p-3">28%</td>
                  <td className="p-3">99.95%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
