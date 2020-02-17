import {config} from 'dotenv';
import newRelic from './newRelic'
import consoleStamp from 'console-stamp';
import api from './api'
import lighthouse from "./lighthouse";
import configurations from "./configurations";
consoleStamp(console, configurations.applicationLogFormat);
config();


const newRelicCallBack = async (lhResults) => {
    const additionAttributes = {
        "lighthouse.ApiReleaseVersion": configurations.releaseVersion
    };
    return await newRelic(lhResults, configurations.newRelicApiKey, additionAttributes);
};


lighthouse(configurations.options).then(lighthouse => {
    configurations.callback = newRelicCallBack;
    configurations.lighthouse = lighthouse;
    return api.startAsync(configurations)
}).then(r => {
    console.log(`API started`)
}).catch(e => {
    console.log(e)
});
