import { BINANCE_API_BASE_URL } from '@/constants/environments';
import { getSortedUniqueOrderBookList } from '@/helpers';
import { Order } from '@/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const useOrderBook = (symbol: string) => {
  const wsRef= useRef<WebSocket>();
  const snapShot = useRef<{ lastUpdateId: number, asks: Order[], bids: Order[] }>();

  const [orderBook, setOrderBook] = useState<{ asks: Order[], bids: Order[] }>();

  const resetConnection = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = undefined;
    snapShot.current = undefined;
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`${BINANCE_API_BASE_URL}/depth?symbol=${symbol}&limit=1000`, { signal: abortController.signal })
      .then((res) => res.json())
      .then((data) => {
        if (!abortController.signal.aborted) {
          snapShot.current = data;
  
          wsRef.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`);
  
          wsRef.current.onmessage = (event) => {
            const msgData = JSON.parse(event.data);
  
            if (msgData?.e === 'depthUpdate' && msgData?.s === symbol && snapShot.current && msgData?.u > snapShot.current.lastUpdateId) {
              setOrderBook({
                asks: getSortedUniqueOrderBookList(orderBook?.asks ?? snapShot.current.asks, msgData.a, 'asc'),
                bids: getSortedUniqueOrderBookList(orderBook?.bids ?? snapShot.current.bids, msgData.b, 'desc'),
              });
            }
          }
        }
      });

    return () => {
      abortController.abort();

      wsRef.current?.close();
      wsRef.current = undefined;
      snapShot.current = undefined;
    }
  }, [symbol]);

  const data = useMemo(() => {
    if (!orderBook) return undefined;

    const displayAsks = orderBook.asks.slice(0, 10).reverse();
    const displayBids = orderBook.bids.slice(0, 10);

    return {
      asks: displayAsks,
      bids: displayBids
    }
  }, [orderBook]);

  return {
    data,
    resetConnection
  }
}