## Solution for problem 3
### This is the code before:
```TypeScript
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}
```
-----------------
### The broblem:
#### 1. Problems in `Props` Interface Declaration:
 In the original code, the `Props` interface does not add any new properties to `BoxProps`, making its declaration unnecessary.
 
 ``` TypeScript
 interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
```
**Improvement**: Founded and add the missing `classes` property to `Props` interface.
#### 2. Problems in `getPriority` function:
-   Using `any` **removes TypeScript’s type safety** . There is no type validation for the input value.
- `getPriority` is called multiple times during the filtering and sorting process causes performance issues.
```TypeScript
const getPriority = (blockchain: any): number => { 
	switch (blockchain) { 
		case 'Osmosis': return 100 
		case 'Ethereum': return 50 
		case 'Arbitrum': return 30 
		case 'Zilliqa': return 20 
		case 'Neo': return 20 
		default: return -99 
	} 
}
```
**Improvement**:
-   Use `string` instead of `any`.
-   Implement a **lookup table (`Record<string, number>`)** for efficient value retrieval.
-  Add the **`priority: number | undefined`** property to the `WalletBalance` interface.

#### 3. Problems in `sortedBalances` function:
- `lhsPriority` is not declared, leading to a runtime error.
- The `blockchain` property is not declared in the `WalletBalance` interface.
- The filtering logic seems inverted. It checks if `balance.amount <= 0` and returns `true`, which means it's keeping negative or zero balances and removing positive ones.
- The calculation condition for the callback of `.sort` is too verbose.
- `prices` is not used in `sortedBalances` 
```TypeScript
const sortedBalances = useMemo(() => {
  return balances.filter((balance: WalletBalance) => {
    const balancePriority = getPriority(balance.blockchain);
    if (lhsPriority > -99) {  // lhsPriority is not defined
      if (balance.amount <= 0) {
        return true;
      }
    }
    return false;
  }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
    const leftPriority = getPriority(lhs.blockchain);
    const rightPriority = getPriority(rhs.blockchain);
    if (leftPriority > rightPriority) {
      return -1;
    } else if (rightPriority > leftPriority) {
      return 1;
    }
  });
}, [balances, prices]);
```
**Improvement**: 
- Replace `lhsPriority` with `balancePriority`, which is already defined.
- Add the **`blockchain: string`** property to the `WalletBalance` interface.
- Simplify and refactor the filter logic to `balance.amount > 0` and use the `&&` operator.
- Simplify the sort condition in `.sort` to (`rhs.priority - lhs.priority`).
- Remove `prices` from `useMemo` dependencies.
#### 4. Problem in `formattedBalances` function:
- Recomputes every time `sortedBalances` changes, which is unnecessary.
- Declared but not used.
```TypeScript
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed(),
  };
});
```
**Improvement**: 
- The transformation can be included inside `useMemo` for efficiency .
- Call `getPriority` in the `map` function to calculate and assign the value to the `priority` property.
- Rename `sortedBalances` to `formattedBalances`.
- Memoized `formattedBalances` using `reduce()` for efficiency

#### 5. Problem in `rows` variable: 
- Storing `rows` in a separate variable is **not necessary**.
- `classes.row` is not declared.
- `prices[balance.currency]` might be undefined.
- Using `index` as a key **can cause unnecessary re-renders** when the list order changes.
```TypeScript
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
  const usdValue = prices[balance.currency] * balance.amount;
  return (
    <WalletRow
      className={classes.row}
      key={index} // Using index as key is not recommended
      amount={balance.amount}
      usdValue={usdValue}
      formattedAmount={balance.formatted}
    />
  );
});
```
**Improvement**: 
- Directly map over sortedBalances inside the `return` statement
- Use a unique combined string like `currency + blockchain` as the key.
- Handle undefined cases by `??` operator.
- Add the  **`classes`**  property to the  `Props`  interface.

---------------
### Optimized Code After Fixes:
```TypeScript
import React, { useMemo } from "react";
import { useWalletBalances, usePrices } from "./";

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

const WalletPage: React.FC<Props> = ({ classes = {}, ...rest }) => {
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
  }, [balances]);

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
```