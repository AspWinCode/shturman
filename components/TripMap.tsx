import React from 'react';
import { Platform } from 'react-native';
import { DayPlan } from '@/constants/data';
import { TripMap as TripMapWeb } from './TripMap.web';

interface TripMapProps {
  days: DayPlan[];
  initialCity?: string;
}

let TripMapNative: ((props: TripMapProps) => React.JSX.Element) | null = null;

if (Platform.OS !== 'web') {
  // Lazy native require to avoid loading react-native-maps in web static rendering.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  TripMapNative = require('./TripMap.native').TripMap as (props: TripMapProps) => React.JSX.Element;
}

export function TripMap(props: TripMapProps) {
  if (Platform.OS === 'web' || !TripMapNative) {
    return <TripMapWeb {...props} />;
  }
  return <TripMapNative {...props} />;
}
