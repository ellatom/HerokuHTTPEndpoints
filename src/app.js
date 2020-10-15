const http = require('http');

let data =[{ "id": "2", "name": 'Andrew Mead', "age": "18" }, { "id": "1", "name": 'Ella Ginzburg', "age": "30" }];
let dataProducts=[{ "id": "2", "product": 'Apple'},{"id":"3","product":"Orange"}];

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});

  processRequest(req, res);
  
  res.end();
}).listen(3030);

function processRequest(req, res)
{
    switch (req.method) {
        case "GET": processGet(req, res); break;
        case "POST": processPost(req, res); break;
        case "PUT": processPut(req, res); break;
        case "DELETE": processDelete(req, res); break;
        default:
            break;
    }
}

function processGet(req, res)
{
    if (req.url == "/users")
    {
        res.write(JSON.stringify(data));
    }
    else if (req.url == "/products")
    {
        res.write(JSON.stringify(dataProducts));
    }
}

function processPost(req,res)
{
    if (req.url == "/user")
    {
        let body='';
        req.on('data', function (chunk) {
            body += chunk;
            let postBody = JSON.parse(body);
            console.log(postBody);
            // console.log(postBody["id"])
            let find = data.find(item => postBody["id"] === item.id);
            console.log(find);
            if(!find)    
            {
                data.push(postBody);
                // res.write(JSON.stringify({"message":'User Added'}));
                console.log(data);
            }
        });
        // req.on('end', function () {
        //     res.end(JSON.stringify({message:'User Added'}))
        // })
    }
}
function processDelete(req,res)
{
    console.log(req.url);
    if (req.url == "/user?id=1")
    {

        let url = req.url;
        console.log()

        let idQuery = url.split("?")[1];
        let idKey = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];

        console.log(idQuery);
        console.log(idKey);
        console.log(idValue);

        data = data.filter(item => idValue !== item.id);
        console.log(data.length)
        if(!data)
        {
            // res.send({ message: 'User not found' });
            // console.log(data)
            return;
        }
        // res.send({ message: 'User Deleted' });
        console.log(data)
    }
}

function processPut(req,res)
{
    if (req.url == "/user?id=1")
    {

        let url = req.url;

        let idQuery = url.split("?")[1];
        let idKey = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];

        console.log(idQuery);
        console.log(idKey);
        console.log(idValue);

        data = data.filter(item => idValue !== item.id);
        console.log(data.length);

        if(!data) return;

            // res.send({ message: 'User not found' });
            // console.log(data)

        // res.send({ message: 'User Deleted' });
        let foundIndex = data.findIndex(item => idValue === item.id);

        if(foundIndex)
        {
            

            let body='';
            req.on('data', function (chunk) {
                body += chunk;
                let postBody = JSON.parse(body);
                data[foundIndex]=postBody;
                console.log(data);
            })   
        }
    }

    if (req.url == "/product?id=1")
    {

        let url = req.url;

        let idQuery = url.split("?")[1];
        let idKey = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];

        console.log(idQuery);
        console.log(idKey);
        console.log(idValue);

        dataProducts = dataProducts.filter(item => idValue !== item.id);
        console.log(dataProducts.length);

        if(!dataProducts) return;

            // res.send({ message: 'User not found' });
            // console.log(data)

        // res.send({ message: 'User Deleted' });
        let foundIndex = dataProducts.findIndex(item => idValue === item.id);

        if(foundIndex)
        {
            

            let body='';
            req.on('data', function (chunk) {
                body += chunk;
                let postBody = JSON.parse(body);
                dataProducts[foundIndex]=postBody;
                console.log(data);
            })   
        }
    }
}

//add postman calls and why put is returning with and error handling and code status
//[
//     { id: '2', name: 'Andrew Mead', age: '18' },
//     '-1': { id: '1', name: 'Eda', age: '30' }
//   ]