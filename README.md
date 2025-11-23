# ITIS4166-051-Fa25-Group4

## How to set up the code
1. Run: ```npm init -y```  
1. Configure the .env file to your local database
1. Run: ```npx prisma migrate dev```  
1. Run: ```npx prisma generate```
1. Run: ```node .\prisma\seed.js```

## How to login
1. Open up User Login postman request
2. Go to Body, then Raw, and then select JSON
3. Type in the email and password in correct format
4. The JWT will now be saved under the environment variable `{{JWT}}`
5. When using api endpoints that require authentication: go to authorization, then select Bearer Token, and then type in `{{JWT}}`
6. Some postman endpoints have comments in the body request

## How to Modularize OpenAPI Files
1. Open terminal and install redocly: ``npm install -D @redocly/cli``
2. Then split into different parts: ``npx @redocly/cli split docs/openapi.yaml --outDir docs/``
3. Next: ``npx @redocly/cli bundle docs/openapi.yaml -o public/bundled.yaml``
4. Save and restart server
