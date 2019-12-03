class AsyncHttp{
    async get(url){
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }

    async post(url,data){
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }
}

