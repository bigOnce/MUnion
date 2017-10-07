import {ENV} from './env';

export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

export const apiEndpoint = isDebug
    ? 'http://localhost:3000'
    : 'http://112.78.15.55:3100';

// 'http://192.168.0.113:3000' Replace with 'UA-########-#' or similar to enable
// tracking
export const trackingID = null;
