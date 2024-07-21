import AveragePriceTitle from "@/components/AveragePriceTitle";
import OrderBook from "@/components/OrderBook";
import Section from "@/components/Section";
import TickerKlinesChart from "@/components/TickerKlinesChart";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView, View } from "react-native";

const DEFAULT_TICKER_OPTIONS = [
  { label: 'BTCUSDT', value: 'BTCUSDT' },
  { label: 'ETHUSDT', value: 'ETHUSDT' },
  { label: 'SOLUSDT', value: 'SOLUSDT' },
];

export default function Index() {
  const navigation = useNavigation();

  const [selectedTicker, setSelectedTicker] = useState('BTCUSDT');

  useEffect(() => {
    navigation.setOptions({ headerTitle: selectedTicker });
  }, [selectedTicker]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          gap: 12,
          padding: 12
        }}
      >
        <Section>
          <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
            {DEFAULT_TICKER_OPTIONS.map((item) => (
              <Button key={item.value} title={item.label} onPress={() => setSelectedTicker(item.value)} />
            ))}
          </View>
        </Section>

        <Section>
          <AveragePriceTitle key={`avgprice_${selectedTicker}`} symbol={selectedTicker} />
          <TickerKlinesChart widthOffset={48} key={`klinechart_${selectedTicker}`} symbol={selectedTicker} />
        </Section>

        <Section>
          <OrderBook key={`orderbook_${selectedTicker}`} symbol={selectedTicker} />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}
