const BASE = process.env.NEXT_PUBLIC_BACKEND;
const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

export default async (endpoint, options = {}) => {

    if(!endpoint) throw new Error('Missing endpoint');

    const config = {
        headers: { ... HEADERS }
    }

    if(options.method) config.method = options.method;
    if(options.data) config.body = JSON.stringify(options.data);
    
    const response = await fetch(`${BASE}${endpoint}`, config);

    return response.json();
    
}