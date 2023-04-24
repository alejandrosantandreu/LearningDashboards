import { ProbabilitiesModel } from '@core/probabilities.model';
import { ValueModel } from '@core/value.model';

export interface IndicatorModel {
    id: string;
    dbId: number;
    name: string;
    description: string;
    value: ValueModel;
    value_description: string;
    rationale: string;
    probabilities: Array<ProbabilitiesModel>;
    date: Date;
    datasource: string;
    categories_description: string;
    hasBN: boolean;
    hasFeedback: boolean;
    confidence80: string;
    confidence95: string;
    forecastingError: string;
    missingFactors: Array<string>;
}