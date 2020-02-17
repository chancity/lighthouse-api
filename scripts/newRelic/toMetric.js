import metricBlacklist from './metricBlacklist'

//Takes lighthouse-metric-ahhh and converts to lighthouseMetricAhhh
const toCamelCase = (value) => {
    const parts = value.split('-');
    let camelCaseName = "";
    for(let i = 0; i < parts.length;i++) {
        if(!parts[i]) continue;
        //First parts
        if(!i) {
            camelCaseName += parts[i];
        } else {
            //All other parts
            camelCaseName += parts[i][0].toUpperCase() + parts[i].slice(1);
        }
    }
    return camelCaseName;
};

const lhResultReducer = (lhResults) => {
    const audits = {};
    Object.keys(lhResults['lhr'].audits).forEach((value) => {
        if(value) {
            const numericValue = lhResults['lhr'].audits[value].numericValue;
            if(numericValue){
                const auditName = toCamelCase(value);
                audits[auditName] = numericValue;
            }
        }
    });

    return {
        timestamp: Date.now(),
        requestedUrl: lhResults['lhr'].requestedUrl,
        finalUrl: lhResults['lhr'].finalUrl,
        ...audits
    };
};


export default (lhResults, additionalMetrics) => {
    const reducedMetrics = lhResultReducer(lhResults);
    const requestedUrl = new URL(reducedMetrics.requestedUrl);

    const metrics = Object.keys(reducedMetrics)
        .filter((propertyName => !metricBlacklist.includes(propertyName)))
        .map((propertyName => ({
            name: `lighthouse.${propertyName}`,
            type: 'gauge',
            value: reducedMetrics[propertyName],
            timestamp: reducedMetrics.timestamp,
            attributes: {
                ...additionalMetrics,
                //These shouldn't be overwritten
                "lighthouse.hostname": requestedUrl.hostname,
                "lighthouse.pathname": requestedUrl.pathname,
                "lighthouse.queryString": requestedUrl.search
            }
        })));


    return [{metrics}];
};
