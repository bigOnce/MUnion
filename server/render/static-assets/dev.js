import {GOOGLE_ANALYTICS_ID} from '../../../config/env';

const createAppScript = () => '<script async type="text/javascript" charset="utf-8" src="/assets/app.js"></scri' +
    'pt>';

const createTrackingScript = () => GOOGLE_ANALYTICS_ID
  ? createAnalyticsSnippet(GOOGLE_ANALYTICS_ID)
  : '';

const createAnalyticsSnippet = id => `<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>`;

const createStylesheets = () => `
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
`;
export {createAppScript, createTrackingScript, createStylesheets};
