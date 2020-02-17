import toMetric from "./toMetric";
import axios from 'axios'
const apiEndPoint = 'https://metric-api.newrelic.com/metric/v1';

export default async (lhResults, apiKey, additionalAttributes) => {
    const metrics = toMetric(lhResults, additionalAttributes);
    const currConfig = {
        headers: {
            "Api-Key": apiKey,
            "Content-Type": "application/json"
        },
    };
    return await axios.post(apiEndPoint, metrics, currConfig);
}
