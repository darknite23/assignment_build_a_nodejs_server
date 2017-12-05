var http = require("http");
var fs = require("fs");

var hostname = "localhost";
var port = 3000;

var server = http.createServer(function(req,res){
        fs.readFile("./public/form.html",'utf-8',function(err,data){
            if(err){ //if err is true run code. 
                //respond with a error stauts
                res.writeHead(404,"Could not find the file your referring to!");
                res.end("404 File Not Found homie!");
            } else {
                res.writeHead(200,{
                    "Content-type" : "text/html"
                });
                console.log(typeof req);
                console.log(req); 
                    //my question is why did i see the console.log inside of the browsers
                    // web console area.  Because it is ran on the server!

                var new_obj_req = {}; //empty obj
                new_obj_req.url = req.url;

                 //inside the reqCopy obj create a url property and assign it the value of 
                 // req's objects url
                //req is a built in object with hundreds of propertys to access.

                        /*
                        reqCopy = {
                            "url": "/"
                        }
                        */
                new_obj_req.method = req.method;
                new_obj_req.httpVersion = req.httpVersion;
                new_obj_req.headers = req.headers;
                new_obj_req.body = req.body;
    
                var new_obj_res = {};
                new_obj_res.statusMessage = res.statusMessage;
                new_obj_res.statusCode = res.statusCode;
                new_obj_res._header = res._header;
                
    
                 data = data.replace("{{ req }}",JSON.stringify(new_obj_req,null,2));
                    //data is the contents of the index.html page. Replace the string
                    // {{ req }} inside the index page with JSON string version of the 
                    //req copy. 
                 data = data.replace("{{ res }}",JSON.stringify(new_obj_res,null,2));

                 //the replace has to take place before we res.end(data)
                res.end(data);
            }
         
        }); 

       
   
    }
);


server.listen(port, hostname, function(){
        //when someone request your site what do you want to happen. 
        console.log(`Listening at http://${hostname}:${port}`);
        //this is logged into the terminal. 
});
