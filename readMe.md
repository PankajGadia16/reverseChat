Technologies Used:
- mongoDB, NodeJs, express, ReactJs


Features included:

- signin and signup using username and password.
- user entries are stored in mongodb (mlab).
- after login, user can view:
	- all usernames and message counts on dashboard tab.
	- all messages (with reverse message from bot) and utilty to send message on Chatbox tab. 

- Instead of Google or facebook login - added own login/signup module.
- Was Unable to:
	- use socket.io
	- use bootstrap for UI
    - host it live



- Schemas: 
	- User
		- username
		- password
	- Chat
		- userId
		- message

- APIs:

	- POST /api/user/signin
		- req: {
			username: STRING, 
			password: STRING
		}
		- res: {
			success: BOOL,
			error: STRING (if success == false)
			user: USER OBJECT (if success == true) 
			}

	- POST /api/user/signup
		- req and res is same as of above api

	- POST /api/chat/
		- req: {
			userId: STRING,
			message: STRING
		}
		- res: {
			success : BOOL
		}

	- GET /api/chat/
		- res: {
			success: BOOL,
			chat: [{
				message: STRING,
				username: STRING
			}]
		}

	- GET /api/chat/count
		- res: {
			success: BOOL,
			countData: [{
				count: NUMBER
				username: STRING
			}]
		}

