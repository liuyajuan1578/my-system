/**
 * Created by zhangdongming on 2016/12/24.
 */
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.get(/bower_components/,function(req,res){
    let staticPath=path.resolve(__dirname,'../app'+req.originalUrl);
    res.sendFile(staticPath);
});
app.use(express.static(path.join(__dirname,'../dev')));

app.listen(8001);
