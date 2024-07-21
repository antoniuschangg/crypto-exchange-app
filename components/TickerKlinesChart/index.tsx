import { memo } from "react";
import { Dimensions, View } from "react-native";
import { CandlestickChart } from "react-native-wagmi-charts";
import useKlinesChart from "@/hooks/useKlinesChart";

type Props = {
  symbol: string;
  widthOffset?: number;
};

const TickerKlinesChart = ({ symbol, widthOffset = 0 }: Props) => {
  const { data } = useKlinesChart(symbol);
  return (
    <View>
      {data && (
        <CandlestickChart.Provider data={data}>
          <CandlestickChart width={Dimensions.get('screen').width - widthOffset}>
            <CandlestickChart.Candles />
          </CandlestickChart>
        </CandlestickChart.Provider>
      )}
    </View>
  );
}

export default memo<Props>(TickerKlinesChart);