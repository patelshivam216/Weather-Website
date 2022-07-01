const request = require('request');


const geocode = (address,callback)=>{

    const url = 'http://api.positionstack.com/v1/forward?access_key=e3acafe78d7392bff3d70ab6323c8f27&query='+ encodeURIComponent(address);

    request({url:url,json:true},(error,responce)=>{
        
        if(error){
            callback('Unable to connect location service!',undefined);
        }else if(responce.body.error || responce.body.data.length==0){
            callback('Unable to find location! Try another search',undefined);
        }else{
            callback(undefined,{
                longitude:responce.body.data[0].longitude,
                latitude:responce.body.data[0].latitude,
                location:responce.body.data[0].name
            });
        }
    })


}

module.exports=geocode;