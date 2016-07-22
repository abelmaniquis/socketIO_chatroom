This is a chatroom app that uses Socket.IO
  The Server makes requests to the client.

POLLING:
  In a polling system, clients continually send new requests
  to the server. If any new messages have been posted since the
  client last checked, then these would be sent back in the response.
  Otherwise, the server sends back an empty response.
  
  Because each client is continually making requests to the server even 
  when there is no new information, your server has to work very hard. 

LONG POLLING:
  Long polling clients make an HTTP Request that is held open by the server.
  
  Essentally, the node server does not send the end event after receiving the request.
  
  When an incoming message comes in from a client, the server then sends a message to the clients which have open requests.
  These clients then open up a new HTTP request to get the new message.

WEB SOCKETS AND SOCKET.IO:
# socketIO_chatroom

socket.io is a javascript library for realtime web applications. 
It enables realtime, bi-directional communication between web clients and servers. 
It has two parts: 
a client side library that runs in the browser, 
and a server side library for node.js.


PUBLIC FOLDER:
  The public folder holds the
  
  


server.js:
  app.use(express.static('public')): serves static files.