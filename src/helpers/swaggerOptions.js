const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        swagger: "2.0",
        openapi: "3.1.0",
        info: {
            title: "Todo Docs",
            version: "1.0.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [{ url: "http://localhost:3000" }],
        paths: {
            "/login": {
                "post": {
                    "tags": [
                        "Auth"
                    ],
                    "operationId": "login",
                    "consumes": ["application/json"],
                    "produces": ["application/json"],
                    "parameters": [
                        {
                            "name": "email",
                            "in": "body",
                            "required": true,
                            "type": "string"
                        },
                        {
                            "name": "password",
                            "in": "body",
                            "required": true,
                            "type": "string"
                        },
                    ],
                },
            },
            "/register": {
                "post": {
                    "tags": [
                        "Auth"
                    ],
                    "operationId": "register",
                    "consumes": ["application/json"],
                    "produces": ["application/json"],
                    "parameters": [
                        {
                            "name": "name",
                            "in": "body",
                            "required": true,
                            "type": "string"
                        },
                        {
                            "name": "email",
                            "in": "body",
                            "required": true,
                            "type": "string"
                        },
                        {
                            "name": "password",
                            "in": "body",
                            "required": true,
                            "type": "string"
                        },
                    ],
                },
            },
            "/lists": {
                "get": {
                    "tags": [
                        "Lists"
                    ],
                    "operationId": "getLists",
                    "produces": [
                        "application/json"
                    ],
                },
                "post": {
                    "tags": [
                        "Lists"
                    ],
                    "operationId": "createList",
                    "consumes": ["application/json"],
                    "produces": ["application/json"],
                    "parameters": [
                        {
                            "name": "ownerId",
                            "in": "body",
                            "required": true,
                            "type": "string",
                        },
                        {
                            "name": "description",
                            "in": "body",
                            "required": true,
                            "type": "string"
                        },
                    ],
                },
                "patch": {
                    "tags": [
                        "Lists"
                    ],
                    "operationId": "updateList",
                    "consumes": ["application/json"],
                    "produces": ["application/json"],
                    "parameters": [
                        {
                            "name": "id",
                            "in": "body",
                            "required": true,
                            "type": "string"
                        },
                        {
                            "name": "description",
                            "in": "body",
                            "required": true,
                            "type": "string"
                        },
                    ],
                },
                "delete": {
                    "tags": [
                        "Lists"
                    ],
                    "operationId": "deleteList",
                    "consumes": ["application/json"],
                    "produces": ["application/json"],
                    "parameters": [
                        {
                            "name": "id",
                            "in": "body",
                            "required": true,
                            "type": "string"
                        },
                    ]
                },
            },
            "user": {
                "get": {
                    "tags": [
                        "User"
                    ],
                    "operationId": "getUser",
                    "produces": [
                        "application/json"
                    ],
                    "parameters": [
                        {
                            "name": "id",
                            "in": "body",
                            "type": "string",
                            "required": true
                        }
                    ],
                },
            },
        },
    },
    apis: ['./src/routes*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
