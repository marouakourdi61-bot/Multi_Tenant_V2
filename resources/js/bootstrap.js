import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Make the Laravel route helper available globally for React components
if (typeof window.route === 'undefined' && window.Laravel && window.Laravel.routes) {
    window.route = (name, params = {}) => {
        let url = window.Laravel.routes[name];
        if (!url) return name;
        
        Object.keys(params).forEach(key => {
            url = url.replace(`{${key}}`, params[key]);
        });
        
        return url;
    };
}
