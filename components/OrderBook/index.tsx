import { View, Text } from "react-native";
import { useOrderBook } from "@/hooks/useOrderBook";
import { memo } from "react";

type Props = {
  symbol: string;
}

const OrderBook = ({ symbol }: Props) => {
  const { data: orderBook } = useOrderBook(symbol);

  return (
    <View style={{ flexDirection: 'row' }}>
      {orderBook ? (
        <>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', gap: 8, height: 20 }}>
              <Text style={{ flex: 1, color: 'red', fontSize: 12 }}>Ask</Text>
              <Text style={{ flex: 1, color: 'red', fontSize: 12 }}>Size</Text>
            </View>
            {orderBook.asks.map((row) => (
              <View key={row[0]} style={{ flexDirection: 'row', gap: 8, height: 20 }}>
                <Text style={{ flex: 1, color: 'red', fontSize: 12 }}>{Number(row[0]).toFixed(2)}</Text>
                <Text style={{ flex: 1, color: 'red', fontSize: 12 }}>{Number(row[1]).toFixed(4)}</Text>
              </View>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', gap: 8, height: 20 }}>
              <Text style={{ flex: 1, color: 'green', fontSize: 12 }}>Bid</Text>
              <Text style={{ flex: 1, color: 'green', fontSize: 12 }}>Size</Text>
            </View>
            {orderBook.bids.map((row) => (
              <View key={row[0]} style={{ flexDirection: 'row', gap: 8, height: 20 }}>
                <Text style={{ flex: 1, color: 'green', fontSize: 12 }}>{Number(row[0]).toFixed(2)}</Text>
                <Text style={{ flex: 1, color: 'green', fontSize: 12 }}>{Number(row[1]).toFixed(4)}</Text>
              </View>
            ))}
          </View>
        </>
      ) : null}
    </View>
  );
};

export default memo<Props>(OrderBook);