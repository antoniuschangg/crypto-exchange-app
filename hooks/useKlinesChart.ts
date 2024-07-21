import { BINANCE_API_BASE_URL } from "@/constants/environments";
import { useEffect, useState } from "react";

const useKlinesChart = (symbol: string) => {
  const [chartData, setChartData] = useState<Array<{
    timestamp: number,
    open: number,
    high: number,
    low: number,
    close: number
  }>>();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = () => {
      fetch(`${BINANCE_API_BASE_URL}/uiKlines?symbol=${symbol}&interval=1d&limit=60`, { signal: abortController.signal })
        .then((res) => res.json())
        .then((data) => {
          if (!abortController.signal.aborted) {
            setChartData(
              data.map((item: any) => ({
                timestamp: Number(item[0]),
                open: Number(item[1]),
                high: Number(item[2]),
                low: Number(item[3]),
                close: Number(item[4]),
              }))
            );
          }
        });
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
      abortController.abort();
    };
  }, [symbol]);

  return {
    data: chartData
  }
}

export default useKlinesChart;