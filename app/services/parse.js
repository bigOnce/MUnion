import {apiEndpoint} from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default() => {
    const client = createRestApiClient().withConfig({baseURL: apiEndpoint});
    return {
        parseUrl: ({url}) => client.request({
            method: 'POST',
            url: '/api/parse',
            data: {topic: {url}}
        })
    };
};
