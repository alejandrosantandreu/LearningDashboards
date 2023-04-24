import { ValueModel } from '@core/value.model';

export interface QFModel {
    id: string;
    name: string;
    description: string;
    value: ValueModel;
    value_description: string;
    date: Date;
    datasource: string;
    rationale: string;
    confidence80: string;
    confidence95: string;
    forecastingError: string;
    mismatchDays: number;
    missingMetrics: Array<any>;
    type: any;
    strategicIndicators: Array<string>;
    formattedDate: string;
}