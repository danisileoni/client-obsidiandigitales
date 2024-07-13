import { TrendingUp, TrendingDown } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { SideBar } from '@/components/dashboard/SideBar';
import { useQuery } from '@tanstack/react-query';
import { getAccountActives } from '@/services/account.service';
import { getCountUsers } from '@/services/user.service';
import {
  getCountOrderPaid,
  getTotalByMonth,
  getTotalProceeds,
} from '@/services/order.service';

export const HomeDashboardPage = () => {
  const { data: countAccounts } = useQuery({
    queryKey: ['counts-account'],
    queryFn: () => getAccountActives(),
  });

  const { data: countUsers } = useQuery({
    queryKey: ['counts-users'],
    queryFn: () => getCountUsers(),
  });

  const { data: totalProceeds } = useQuery({
    queryKey: ['total-proceeds'],
    queryFn: () => getTotalProceeds(),
  });

  const { data: totalByMonth } = useQuery({
    queryKey: ['total-by-month'],
    queryFn: () => getTotalByMonth(),
  });

  const { data: countOrderPaid } = useQuery({
    queryKey: ['count-order-paid'],
    queryFn: () => getCountOrderPaid(),
  });

  const calculatePercentageChange = (
    current: number | string,
    previous: number | string,
  ) => {
    if (typeof current !== 'number' || typeof previous !== 'number')
      return Number.NaN;
    if (previous === 0) return current === 0 ? 0 : 100;
    return ((current - previous) / previous) * 100;
  };

  const chartData = (() => {
    if (totalByMonth && countOrderPaid) {
      return totalByMonth.map((monthData, index) => {
        const previousProceeds =
          index > 0 ? totalByMonth[index - 1]?.total || 0 : 0;
        const previousPays =
          index > 0 ? countOrderPaid[index - 1]?.total || 0 : 0;

        const proceedsChange = calculatePercentageChange(
          monthData?.total || 0,
          previousProceeds,
        );
        const paysChange = calculatePercentageChange(
          countOrderPaid[index]?.total || 0,
          previousPays,
        );

        return {
          month: new Date(0, index).toLocaleString('es', { month: 'long' }),
          proceeds: monthData?.total,
          pays: countOrderPaid[index]?.total,
          proceedsChange,
          paysChange,
        };
      });
    }
    return [];
  })();

  const chartConfig = {
    proceeds: {
      label: 'Ingresos',
      color: 'hsl(var(--chart-2))',
    },
    pays: {
      label: 'Ventas',
      color: 'hsl(var(--chart-4))',
    },
  } satisfies ChartConfig;

  return (
    <section className="h-screen flex text-[#c1c1c1] bg-[#0a0a0a]">
      <SideBar />
      <div className="w-full flex flex-col gap-2 items-center p-3">
        <div className="w-full flex gap-2">
          <Card className="bg-[#212121] border-[#212121] h-[420px] w-1/2">
            <CardHeader>
              <CardTitle className="text-[#dedede]">Ventas</CardTitle>
              <CardDescription className="text-[#d3d3d3b9]">
                Total de ventas durante los ultimos 12 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                style={{ height: '250px', width: '100%' }}
              >
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                  width={680}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={6}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                  />
                  <Area
                    dataKey="pays"
                    type="linear"
                    fill="var(--color-pays)"
                    fillOpacity={0.4}
                    stroke="var(--color-pays)"
                    stackId="b"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-white font-medium leading-none">
                    {chartData.length > 0 && (
                      <>
                        {chartData[chartData.length - 1].paysChange >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        {Math.abs(
                          chartData[chartData.length - 1].paysChange,
                        ).toFixed(2)}
                        % this month
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card className="bg-[#212121] border-[#212121] h-[420px] w-1/2">
            <CardHeader>
              <CardTitle className="text-[#dedede]">Ingresos</CardTitle>
              <CardDescription className="text-[#d3d3d3b9]">
                Total de ingresos durante los ultimos 12 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                style={{ height: '250px', width: '100%' }}
              >
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                  width={680}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={6}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                  />
                  <Area
                    dataKey="proceeds"
                    type="linear"
                    fill="var(--color-proceeds)"
                    fillOpacity={0.4}
                    stroke="var(--color-proceeds)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-white font-medium leading-none">
                    {chartData.length > 0 && (
                      <>
                        {chartData[chartData.length - 1].proceedsChange >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        {Math.abs(
                          chartData[chartData.length - 1].proceedsChange,
                        ).toFixed(2)}
                        % this month
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full flex gap-2">
          <Card className="bg-[#212121] border-[#212121] h-[200px] w-[33.3%]">
            <CardHeader>
              <CardTitle className="text-[#dedede]">Usuarios</CardTitle>
              <CardDescription className="text-[#d3d3d3b9]">
                Total de usuarios en la web
              </CardDescription>
            </CardHeader>
            <CardContent className="text-4xl font-bold text-sky-500">
              {countUsers?.total}
            </CardContent>
          </Card>
          <Card className="bg-[#212121] border-[#212121] h-[200px] w-[33.3%]">
            <CardHeader>
              <CardTitle className="text-[#dedede]">Cuentas</CardTitle>
              <CardDescription className="text-[#d3d3d3b9]">
                Total de las cuentas activas de plataformas
              </CardDescription>
            </CardHeader>
            <CardContent className="text-4xl font-bold text-sky-500">
              {countAccounts?.total}
            </CardContent>
          </Card>
          <Card className="bg-[#212121] border-[#212121] h-[200px] w-[33.3%]">
            <CardHeader>
              <CardTitle className="text-[#dedede]">Ingresos</CardTitle>
              <CardDescription className="text-[#d3d3d3b9]">
                Total de ingresos de lo que va del mes
              </CardDescription>
            </CardHeader>
            <CardContent className="text-4xl font-bold text-sky-500">
              ${totalProceeds?.total} ARS
            </CardContent>
          </Card>
        </div>
        <Card className="bg-[#212121] border-[#212121] h-[9.6rem] w-[100%]">
          <CardHeader>
            <CardTitle className="text-[#dedede]">Mantenimiento</CardTitle>
            <CardDescription className="text-[#d3d3d3b9]">
              Dias faltantes para la paga
            </CardDescription>
          </CardHeader>
          <CardContent className="text-4xl font-bold text-sky-500">
            25 Dias
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
