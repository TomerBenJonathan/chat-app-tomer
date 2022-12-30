import { Message } from '../types/message';
// import { mockUsers } from '../assets/mockUsers'; // todo (done): remove this line after server implementation

// const endpoint = '../assets/'; // todo: add endpoint (server) address (starting with http://)
const endpoint = 'http://localhost:3000'; 


/**
 * GET Request to get the list of messages
 **/
export async function getMessages() {
  // todo (done): replace this with fetch to get the messages from the server
  // const { mockMessages } = await import(`${endpoint}/mockMessages`);

  // todo (done): this should be implemented in the server. Chat Messages should already have the authors' names.
  // todo (done): remove this mapping when getting the data from the server
  // const mockMessagesWithNames = mockMessages.map((message: Message) => {
  //   const author = mockUsers.find(user => user.id === message.authorId);
  //   const authorName = author && author.name;
  //   return { ...message, authorName };
  // });
  // return mockMessagesWithNames;

  const response = await fetch(`${endpoint}/messages`)
  const mockMessagesWithNames = await response.json();
  console.log("received from server - messages: ", mockMessagesWithNames);  
  return mockMessagesWithNames;  
}

/**
 * GET request to get the full list of users - id + name
 **/
export async function getUsers() {
  // todo (done): need to replace this with fetch to get the user list from the server
  //const { mockUsers } = await import(`${endpoint}/mockUsers`);
  //return mockUsers;

  const response = await fetch(`${endpoint}/users`)
  const data = await response.json();
  console.log("received from server users: ", data);  
  return data;  
}


/**
 * GET request to get the full details of a user
 **/
export async function getUserDetails(userId: number) {
  // todo (done): replace this with fetch to get the user details from the server.
  //  For mocking example, we're calling an external JSON service.
  //  You can use mockUserDetails.ts for the list of user details in the server.
  // const res = await fetch(`https://jsonplaceholder.typicode.com/users?id=${userId}`);
  // return (await res.json())[0];

  const response = await fetch(`${endpoint}/users/` + userId)
  const data = await response.json();
  console.log("received from server - user: ", data);  
  return data;  

}

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message) {
  // todo (done): implement sending a new message to the server
  const config : any = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
  }
  const response = await fetch(`${endpoint}/messages`, config)
  const data = await response.json();
  console.log("received from server - user: ", data);  
  return data;  

}

/**
 * POST request to change the user's like of a message
 **/
export async function changeMessageLikes(messageId: number, userId: number, like: boolean) {
  // todo (done): implement sending a rquest to change the like of a message by the user
  const config : any = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({messageId, userId, like})
  }
  const response = await fetch(`${endpoint}/messages`, config)

}