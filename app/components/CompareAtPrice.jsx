import clsx from 'clsx';
import {useMoney} from '@shopify/hydrogen';

export function CompareAtPrice({data, className}) {
    const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
      useMoney(data);
  
    const styles = clsx('strike', className);
  
    return (
      <span className={styles}>
        {currencyNarrowSymbol}
        {withoutTrailingZerosAndCurrency}
      </span>
    );
  }