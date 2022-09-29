import * as React from 'react';
import { Settings } from './settings';
import type { ThemeProp } from '../types';
export declare type Props = {
    children: React.ReactNode;
    theme?: ThemeProp;
    settings?: Settings;
};
declare const Provider: (props: Props) => JSX.Element;
export default Provider;
