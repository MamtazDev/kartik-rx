# rx - frontend

## Custom documentation

### For development with cloud backend

The current codebase should by default be supporting cloud backend. In the `.env` file, value of `REACT_APP_DOMAIN_DEV` should be set to the cloud endpoint.

### For development with local backend
Add following line to `/etc/hosts`
```
127.0.0.1	dev.rx.com
```

Update `.env` file, use `dev.rx.com` value for `REACT_APP_DOMAIN_DEV` variable instead of the aws url.

To start frontend server
```
npm install
npm start
```


### Login details
User created with default setup:
Prod:
`admin@rx.com / admin@rx123`

### Commit and push instructions:
#### Before pushing changes run:
```sh
./node_modules/eslint/bin/eslint.js --fix src/
```

Useful links:
- http://ec2-3-110-67-42.ap-south-1.compute.amazonaws.com:8080/docs

### Convention for dictionary variables used for mapping content in the UI.

The convention used in this codebase is to define a set of constants using an object literal in JavaScript.
Each constant has an 'identifier' property that serves as a unique key to reference the value in code, and a 
'displayText' property that provides a human-readable name for the constant, and so on.