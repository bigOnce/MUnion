import {apiEndpoint} from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default() => {
    const client = createRestApiClient().withConfig({baseURL: apiEndpoint});
    return {
        setFilter: ({filter, type, domain, name, url}) => client.request({
            method: 'POST',
            url: '/api/news/setfilter',
            data: {set: {filter, type, domain, name, url}}
        }),
        
    };
};
