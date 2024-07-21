import { StyleSheet, Text } from "react-native";
import useAveragePrice from "@/hooks/useAveragePrice";

type Props = {
  symbol: string;
};

const AveragePriceTitle = ({ symbol }: Props) => {
  const { data } = useAveragePrice(symbol);

  return (
    <Text style={styles.title}>{data ?? 'Loading.'}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  }
});

export default AveragePriceTitle;