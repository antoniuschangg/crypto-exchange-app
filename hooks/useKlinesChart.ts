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

    fetch(`${BINANCE_API_BASE_URL}/uiKlines?symbol=${symbol}&interval=1d&limit=60`, { signal: abortController.signal })
      .then((res) => res.json())
      .then((data) => {
        setChartData(
          data.map((item: any) => ({
            timestamp: Number(item[0]),
            open: Number(item[1]),
            high: Number(item[2]),
            low: Number(item[3]),
            close: Number(item[4]),
          }))
        );
      });

    return () => {
      abortController.abort();
    };
  }, [symbol]);

  return {
    data: chartData
  }
}

export default useKlinesChart;