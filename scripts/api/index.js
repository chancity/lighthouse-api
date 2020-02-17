import express from 'express';
import morgan from 'morgan'
import defaultOptions from "../lighthouse/defaultOptions";

export default {
    startAsync: async (configurations) => {
        const _app = express();
        _app.use(express.urlencoded({ extended: true }));
        _app.use(express.json());
        _app.use(morgan(configurations.apiLogFormat));

        _app.post('/', async (request, response, next) => {
            try{
                const {options, url, callbackUrl} = request.body;
                const testResult = await configurations.lighthouse.testAsync(url, options);

                configurations.callback &&
                    configurations.callback(testResult)
                    .then((callbackResponse) => console.log(`result callback success`))
                        .catch((error) => console.log(`result callback error: ${error}`));

                await response.json({
                    testResult
                });
            } catch (e) {
                next(e)
            }
        });

        _app.get('/default_options', async (request, response, next) => {
            try{
                await response.json({
                    defaultOptions
                });
            } catch (e) {
                next(e)
            }
        });

        _app.listen(configurations.port, () => {
            console.log(`Lighthouse API application listening on port ${configurations.port}!`);
            console.log(`Send HTTP POST to http://hostname/ with application/json content of {"url":"https://google.com/"}`);
            console.log(`Send HTTP POST to http://hostname/default_options to review test settings`);

        });
    },
    stopAsync: () => console.log("stopped")
}



