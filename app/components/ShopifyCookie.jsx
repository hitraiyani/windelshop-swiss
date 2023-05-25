import React from 'react'
import {useAnalytics} from '~/hooks//useAnalytics';

export  function ShopifyCookie({locale}) {
    const hasUserConsent = true;
    useAnalytics(hasUserConsent,locale);
}
