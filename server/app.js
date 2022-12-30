const express = require('express');
//import mockMessages from './mockMessages'
const mockMessages = require('./mockMessages')
const mockUserDetails = require('./mockUserDetails')

const app = express();
const PORT = 3001;

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.get('/messages', (req, res)=>{
	//res.set('Content-Type', 'text/html');
    res.append('Content-Type', 'application/json; charset=UTF-8');      

    let messages =  mockMessages.mockMessages.map(msg=>
        {
            let userAuthor = mockUserDetails.mockUserDetails.find(user=>(user.id==msg.authorId));     
            return {...msg, 
                    authorName: (userAuthor ? userAuthor.name : "none"),
                 };
        }
    );
    res.status(200).json(messages);
});


app.get('/users', (req, res)=>{
	//res.set('Content-Type', 'text/html');
    res.append('Content-Type', 'application/json; charset=UTF-8');      

    let users = mockUserDetails.mockUserDetails.map(user=>
        ({
            "id": user.id,
            "name": user.name
        })
    );
    res.status(200).json(users);
});

app.get('/users/name/:id', (req, res)=>{
	//res.set('Content-Type', 'text/html');
    res.append('Content-Type', 'application/json; charset=UTF-8');      

    let user = mockUserDetails.mockUserDetails.find(user=>(user.id == req.params.id) );
    res.status(200).json({id: user.id, name: user.name});
});

//question 6
app.post('/messages', (req, res)=>{
    res.append('Content-Type', 'application/json; charset=UTF-8');      
    
    const {id, authorId, body, timestamp} = req.body;
    let msg = {id: id, authorId: authorId, body: body, timestamp: timestamp, likes: []};
    mockMessages.mockMessages.push(msg);
})

//question 7
app.post('/toggle_like', (req, res)=>{
    res.append('Content-Type', 'application/json; charset=UTF-8');      
    
    const {messageId, userId, like} = req.body;
    let message = mockMessages.mockMessages.find(msg=>(msg.id === messageId));     
    if (like)
    {
        message.likes = message.likes.filter(user_id_liked=>user_id_liked !== userId);
        message.likes.push(userId);
    }
    else {
        message.likes = message.likes.filter(user_id_liked=>user_id_liked !== userId);
    }
})


app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running",
				"and App is listening on port " + PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
