const express = require('express')
const app = express()


var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = 'd6F3Efeq';

var fs = require('fs');


function saveLocally(){    

    console.log('before unlink: ');

    var fs = require('fs');
    if (fs.existsSync('data.json')) {
        fs.unlinkSync('data.json')
    }
    

    var saveData = {
        users:users,
        items:items,
        history:history,
        revenue
    }

    var saveDataString = JSON.stringify(saveData)

    fs.writeFileSync('data.json',saveDataString,{encoding:'utf8',flag:'w'})

}

function encrypt(buffer) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(buffer, 'utf8', 'hex') + cipher.final('hex');
    return crypted;
}

function decrypt(buffer) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(buffer, 'hex', 'utf8') + decipher.final('utf8')
    return dec;
}

function validateRequest(req,admin,requiredUser){
    var token = req.query.token;

    // Make sure we have a token
    if(token==null) return false;

    var decryptedToken = decrypt(token);
    var split = decryptedToken.split(":");
    var adminUsername = split[0];
    var adminPassword = split[1];

    // Get the admin user
    var adminUser = users.find(c=>c.username.toLowerCase()==adminUsername&&c.password==adminPassword)

    // Make sure the user exists
    if(adminUser==null) return false

    if(requiredUser!=null&&requiredUser!=undefined){
        if(requiredUser!=adminUser.username)return false;
    }

    // Make sure they are an administrator
    if(adminUser.admin!=admin&&admin==true) return false;

    return true;
}

function matchItems(a,query){

    // Match names
    return a.name.toLowerCase().includes(query.toLowerCase().trim())||

      // Match categories
      a.category.toLowerCase().trim()==query.toLowerCase().trim()
}

var revenue = 0;
var users = [{ username: "admin", password: "admin", admin: true }]
var history = []
var items = []



var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));

revenue=obj.revenue;
users=obj.users;
history=obj.history;
items=obj.items;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/overview', function (req, res) {

    if(!validateRequest(req,true)){

        res.send(JSON.stringify({result:"failure",error:"Access Denied"}))
        return;
    }

    res.send(JSON.stringify({result:"success",data:{count:items.length,users:users.length,revenue:revenue}}))

});
app.post('/login', function (req, res) {

    // Make sure we have the parameters
    if(req.body.username==null&&req.query.token==null) return res.send(JSON.stringify({result:"failure",error:"Missing username."}));
    if(req.body.password==null&&req.query.token==null) return res.send(JSON.stringify({result:"failure",error:"Missing password."}));


    var user = users.find(c => c.username == req.body.username && c.password==req.body.password);

    // If we have a token and username
    if(req.query.token!=null&&req.body.username!=null){
    
        // If the token validates for the usr with the token
        if(validateRequest(req,false,req.body.username)){

            // Get with just the username
             user = users.find(c => c.username == req.body.username);
        }else{

            return res.send(JSON.stringify({result:"failure",error:"Access Denied"}));
        }
    }

    console.log("Trying to login: " + req.body.username);

    // Specify the result
    var result = {}

    // Add the token
    if (user != null) {
        result.result="success";
        result.token = encrypt(user.username + ":" + user.password).toString();
        result.data = user;
    }else{
        result.result="failure";
        result.error="Invalid username/password combination"
    }

    res.send(result)
})
app.post('/user/:username/delete', function (req, res) {

    if(!validateRequest(req,true)) return res.send(JSON.stringify({result:"failure",error:"Access Denied"}));

    var username = req.params.username;  

    if(username==null) return res.send(JSON.stringify({result:"failure",error:"No username specified"}));
    
    var user = users.find(c => c.username = username);

    if(user==null) return res.send(JSON.stringify({result:"failure",error:"No such user"}));
    if(users.length==1) return res.send(JSON.stringify({result:"failure",error:"Not able to delete the last user"}));

    users.splice(users.indexOf(user),1)

    saveLocally();

    res.send(JSON.stringify({result:"success",data:users}))
})
app.post('/signup', function (req, res) {

    if(req.body.username==null) return res.send(JSON.stringify({result:"failure",error:"No username provided"}));
    if(req.body.password==null) return res.send(JSON.stringify({result:"failure",error:"No password provided"}));

    var user = users.find(c => c.username == req.body.username);

    console.log("Trying to signup new account: " + req.body.username);

    // Specify the result
    var result = {
        result: (user == null) ? "success" : "failure"
    }

    if (user == null) {

        var newUser = { username: req.body.username, password: req.body.password, admin: req.body.admin == true }

        result.token = encrypt(newUser.username + ":" + newUser.password).toString();
        result.data = newUser;

        users.push(newUser);

        saveLocally();
    }else{

        result.error="The provided username is already taken."
    }


    console.log(result.result);

    res.send(result)
});

app.get('/user/history', function (req, res) 
{

    // Make sure the accessor is an admin
    if(!validateRequest(req,true)) return res.send(JSON.stringify({result:"failure",error:"Access Denied"}));  

    // Return the users
    res.send(JSON.stringify({result:"success",data:history}));
});
app.get('/user/:username/history', function (req, res) 
{
    var requiredUser = req.params.username

    if(requiredUser==null)return res.send(JSON.stringify({result:"failure",error:"No user specified."}))

    // Make sure the accessor is an admin
    if(!validateRequest(req,false,requiredUser)) return res.send(JSON.stringify({result:"failure",error:"Access Denied"}));  

    // Return the users
    res.send(JSON.stringify({result:"success",data:history.filter(c=>c.username.toLowerCase()==requiredUser.toLowerCase())}));
});
app.get('/users', function (req, res) 
{
    // Make sure the accessor is an admin
    if(!validateRequest(req,true)) return res.send(JSON.stringify({result:"failure",error:"Access Denied"}));
    
    // Return the users
    res.send(JSON.stringify({result:"success",data:users}))
});

app.get('/items/similar/:id', function (req, res) {

    var i = items.find(c=>c.id==req.params.id);

    if(i==null)res.send(JSON.stringify([]))

    else res.send(JSON.stringify({result:"success",data:items.filter(c=>c.category==i.category&&c.name!=i.name)}))
});

app.post("/items/buy", function (req, res) {

    var username = req.body.username
    

    if(!validateRequest(req,false)){

        res.send(JSON.stringify({result:"failure",error:"Access Denied"}));
        return 
    }

    if(username==null){
        
        res.send(JSON.stringify({result:"failure",error:"No username specified"}));
        return 
    }

    var buyItems = req.body.items

    if(buyItems==null){

        res.send(JSON.stringify({result:"failure",error:"No items specified"}));
        return 
    }

    for(var i=0;i<buyItems.length;i++){

        var buyItem = buyItems[i]
        var serverItem = items.find(c=>c.name.toLowerCase()==buyItem.name.toLowerCase());

        if(serverItem==null){
            
            res.send(JSON.stringify({result:"failure",error:"Could not find: "+buyItem.name}));
            return 
        }
        
        if(serverItem.count<buyItem.count){
            
            res.send(JSON.stringify({result:"failure",error:"Could not buy all items. Insufficient inventory."}));
            return 
        }
    }

    var total = 0;

    for(var i=0;i<buyItems.length;i++){

        var buyItem = buyItems[i];
        var serverItem = items.find(c=>c.name.toLowerCase()==buyItem.name.toLowerCase());

        serverItem.count-=buyItem.count;

        total+=buyItem.price*buyItem.count;
    }

    revenue+=total

    history.push({
        username:username,
        items:buyItems,
        date:new Date().toDateString(),
        total:total
    })

    console.log("Adding:")
    console.log(history[history.length-1])

    saveLocally();

    res.send(JSON.stringify({result:"success"}))
})
app.get("/items", function (req, res) {

var query = req.query.query

    console.log("Query: "+query)

    if(query!=null&&query.trim().length>0){

        res.send(JSON.stringify({result:"success",data:items.filter(c=>matchItems(c,query))}));
    }
    else{
        res.send(JSON.stringify({result:"success",data:items}))
    }

})
app.get("/item/:itemId", function (req, res) {

    if(req.params.itemId==null){

        res.send(JSON.stringify({result:"failure",error:"No id specified."}))
        return;
    }


    var existingItem = items.find(c => c.id == req.params.itemId);

    if(existingItem==null){

        res.send(JSON.stringify({result:"failure",error:"No such item found."}))
        return;
    }

    res.send({result:"success",data:existingItem})
})
app.post("/item/remove", function (req, res) {
  
    var id = req.body.id

    if(!validateRequest(req,true)){

        res.send(JSON.stringify({result:"failure",error:"Access Denied"}));
        return 
    }

    if(id==null){

        res.send(JSON.stringify({result:"failure",error:"No id specified"}));
        return 
    }

    var existingItem = items.find(c=>c.id=id)


    if(existingItem==null){

        res.send(JSON.stringify({result:"failure",error:"No no existing item found"}));
        return 
    }

    items = items.filter(c=>c.id!=id);

    

    saveLocally();
    
     res.send(JSON.stringify({result:"success",data:items}));
})
app.post("/item/remove/all", function (req, res) {
  
    var id = req.body.id

    if(!validateRequest(req,true)){

        res.send(JSON.stringify({result:"failure",error:"Access Denied"}));
        return 
    }

    items.splice(0,items.length)

    

    saveLocally();
    
    res.send(JSON.stringify({result:"success",data:items}));
})
app.post("/item/add", function (req, res) {
  
    var name = req.body.name
    var description = req.body.description
    var count = req.body.count
    var image = req.body.image
    var category = req.body.category
    var price = req.body.price

    console.log("Item add body: "+JSON.stringify(req.body))

    if(!validateRequest(req,true)){

        res.send(JSON.stringify({result:"failure",error:"Access Denied"}));
        return 
    }

    if(name==null||description==null||count==null||count==0||image==null||category==null||price==null){

        var foundExisting = false;

        if(name!=null&&count!=null){

            var existingItem=items.find(c=>c.name.toLowerCase()=name.toLowerCase())

            if(existingItem!=null){

                foundExisting = true

                existingItem.count+=quantity
                
                res.send(JSON.stringify({result:"success",data:items}));

                return;
            }
        }
        
        if(!foundExisting){
            res.send(JSON.stringify({result:"failure",error:"Missing data"}));
            return 
        }
    }

    var maxId= 0
    items.forEach(c=>maxId=Math.max(maxId,c.id))
    
    items.push({id:maxId+1,name:name,description:description,count:count,image:image,category:category,rating:2.5,price:price})
    
    saveLocally();

    res.send(JSON.stringify({result:"success",data:items}));
})

app.post("/item/update", function (req, res) {
  
    var item = req.body.item

    if(!validateRequest(req,true)){

        res.send(JSON.stringify({result:"failure",error:"Access Denied"}));
        return 
    }

    var existingItem=items.find(c=>c.id==item.id)

    if(existingItem==null){
        
        res.send(JSON.stringify({result:"failure",error:"No existing item found"}));
        return 
    }

    for(var prop in item){

        existingItem[prop] = item[prop]
    }

    saveLocally();
    
    res.send(JSON.stringify({result:"success",data:items}));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})