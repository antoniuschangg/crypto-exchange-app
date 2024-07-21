import { useEffect, useRef, useState } from 'react';

const useAveragePrice = (symbol: string) => {
  const wsRef= useRef<WebSocket>();

  const [currentAveragePrice, setCurrentAveragePrice] = useState<string>();

  useEffect(() => {
    wsRef.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@avgPrice`);

    wsRef.current.onmessage = (event) => {
      const msgData = JSON.parse(event.data);
      
      if (msgData?.e === 'avgPrice' && msgData?.s === symbol && msgData.w) {
        setCurrentAveragePrice(msgData.w);
      }
    };

    return () => {
      wsRef.current?.close();
      wsRef.current = undefined;
    }
  }, [symbol]);

  return {
    data: currentAveragePrice
  }
}

export default useAveragePrice;