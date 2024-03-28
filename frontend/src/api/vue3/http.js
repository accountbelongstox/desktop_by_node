import mittEvent from '@/api/vue3/mitt.js';

class DataSender {
    queue = [];
    defaultApiUrl = `http://example.com/api/data'`

    getApiUrl() {
        return this.defaultApiUrl;
    }

    serialize(obj, maxDepth = 100, currentDepth = 0, seen = new Set(), exclude = {}) {
        if (currentDepth >= maxDepth) { return null; }
        if (obj === null || typeof obj !== 'object') { return obj; }
        if (seen.has(obj)) { return null; }
        seen.add(obj);
        let result = Array.isArray(obj) ? [] : {};
        const keys = Object.keys(obj)
        keys.forEach(key => {
            let value = obj[key];
            if (exclude[key] != undefined) {
                if (exclude[key].value != undefined) {
                    result[key] = exclude[key].value;
                }
                return;
            }
            if (typeof value === 'function') {
                result[key] = null;
                return;
            }
            result[key] = this.serialize(value, maxDepth, currentDepth + 1, seen, exclude);
        })
        seen.delete(obj);
        return result;
    }
//the method in queue is not stand for request method,it's a users' action to server
    async addToQueue(method, url, data = {}, callback){
        this.queue.push({
            method,
            data,
            callback
        });
        processQueue(url);
    }

    async processQueue(url){
        if(this.queue.length==0){
            return null;
        }
        for(const p of this.queue){
            let success = false;
            if(p.method === "GET"){
                success = this.get(p, url);
            }else{
                success = this.post(p, url); 
            }
    
            if(success){
                this.queue.splice(this.queue.indexOf(p), 1);
                this.processQueue(url);
            }else{
                setTimeout(this.processQueue(url), 2000);
            }
        }  
    }
    
    async post(param,url){
        try { 
            const responseData = await send(param, 'POST', url);
            if (responseData !== null) {
                console.log('Response from server:', responseData);
                mittEvent.emit('POST', responseData)
                return true;
            } else {
                console.error('Failed to receive valid response from server');
                return false;
            }
        } catch (error) {
            console.error('Error sending data to server:', error);
            return false;
        }
    }

    async get(param,url){
        try { 
            const responseData = await send(param, 'GET', url);
            if (responseData !== null) {
                console.log('Response from server:', responseData);
                mittEvent.emit('GET', responseData)
                return true;
            } else {
                console.error('Failed to receive valid response from server');
                return false;
            }
        } catch (error) {
            console.error('Error sending data to server:', error);
            return false;
        }
    }

    async send(param, method = 'POST', url) {
        if (!url) url = this.getApiUrl();
        try {
            if (!param) {
                param = {};
            }

            if(typeof param.data === 'function'){
                param.callback = param.data;
                param.data = {};
            }
    
            data = this.serialize(param.data);
    
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
    
            if (document.cookie) {
                options.credentials = 'include';
            }
    
            if (method === 'GET') {
                delete options.body;
                delete options.headers['Content-Type'];
            }
    
            const response = await fetch(url, options);
    
            if (!response.ok) {
                console.error('Failed to send data to server');
                return null;
            }

            if(param.callback) param.callback(response);
    
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            console.error('Error sending data to server:', error);
            return null;
        }
    }    
  }
  export default new DataSender();
  