import React, { useMemo } from "react";
import { useWalletBalances, usePrices } from "";
import { BoxProps } from "";
import { WalletRow } from "";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
  priority?: number; // Add priority to WalletBalance
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {
  classes?: {
    row?: string; // Optional CSS class
  };
}

const getPriority = (blockchain: string): number => {
  const priorities: Record<string, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };
  return priorities[blockchain] ?? -99;
};

const WalletPage: React.FC<Props> = ({ classes, ...rest }) => {
  const balances: WalletBalance[] = useWalletBalances();
  const prices = usePrices();

  const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .reduce<FormattedWalletBalance[]>((acc, balance) => {
        const priority = getPriority(balance.blockchain);
        if (priority > -99 && balance.amount > 0) {
          acc.push({
            ...balance,
            priority,
            formatted: balance.amount.toFixed(),
          });
        }
        return acc;
      }, [])
      .sort((lhs, rhs) => rhs.priority! - lhs.priority!); // Direct sorting
  }, [balances, prices]);

  return (
    <div {...rest}>
      {formattedBalances.map((balance) => (
        <WalletRow
          className={classes?.row}
          key={`${balance.currency}-${balance.blockchain}`} // Avoid duplicate keys
          amount={balance.amount}
          usdValue={(prices[balance.currency] ?? 0) * balance.amount} // Handle undefined cases
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};

export default WalletPage;