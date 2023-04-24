export interface MetricModel {
    id: string;
    name: string;
    description: string;
    value: number;
    value_description: number;
    date: Date;
    datasource: string;
    rationale: string;
    confidence80: string;
    confidence95: string;
    forecastingError: string;
    qualityFactors: Array<string>;
}