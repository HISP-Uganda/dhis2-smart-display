import { getInstance } from 'd2/lib/d2';
import arrayClean from 'd2-utilizr/lib/arrayClean';

// Get "all" dashboards on startup
export const apiFetchDashboards = () => getInstance().then(d2 => d2.models.dashboard.list({paging: 'false',}));