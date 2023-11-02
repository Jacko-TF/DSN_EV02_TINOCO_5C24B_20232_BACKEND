"# DSN_EV02_TINOCO_5C24B_20232_BACKEND" 
---
## Guía de instalación

### Requerimientos:

    Node
    Git
    Una aplicacion Single Page en Auth0 para React.js
    Una API en Auth0 para Node.js
    Docker y docker-compose
    
### Instalación local
    
>Ejecutaremos los siguientes comandos

    git clone https://github.com/Jacko-TF/DSN_EV02_TINOCO_5C24B_20232_BACKEND.git backend
    cd backend 
    npm install

>Antes de ejecutar nuestra aplicación debemos crear un archivo .env en el directorio backend con el siguiente contenido

    PORT=8000
    URI = 
    AUDIENCE = 
    issuerBaseURL =

>Ahora podemos ejecutar el comando

    npm start

>Veremos nuestra aplicación desde http://localhost:8000/

---
### Instalación en Docker
>Para instalacion en docker necesitaremos crear un archivo Dockerfile, para el frontend vamos a ejecutar

    mkdir frontend
    cd frontend
    vi Dockerfile
    
>En la línea de comandos de vi podemos editar colocando i , copiamos el siguiente contenido:

    FROM node:18.16
    RUN apt-get update && apt-get install -y nodejs npm
    RUN git clone -q https://github.com/Jacko-TF/DSN_EV02_TINOCO_5C24B_20232_FRONTEND.git frontend
    WORKDIR frontend
    RUN npm install > /dev/null
    EXPOSE 3000
    CMD ["npm","start"]
    
> Vamos a usar otro archivo Docker para el backend, nos dirigimos al directorio raiz donde esta nuestra carpeta frontend:

    cd ..
    mkdir backend
    cd backend
    vi Dockerfile

>En la línea de comandos de vi podemos editar colocando i , copiamos el siguiente contenido:

    FROM node:18.16
    RUN apt-get update && apt-get install -y nodejs npm
    RUN git clone -q https://github.com/Jacko-TF/DSN_EV02_TINOCO_5C24B_20232_FRONTEND.git frontend
    WORKDIR frontend
    RUN npm install > /dev/null
    EXPOSE 3000
    CMD ["npm","start"]

> Luego regresamos al directorio raiz y crearemos un arhivo compose.yml

    cd ..
    vi docker-compose.yml
    
> Vamos a colocar el siguiente contenidor:

    version: '3.9'

    services:
      backend:
        build: ./backend
        ports:
          - "8000:8000"
        environment:
          - PORT=
          - URI=mongodb://mongo:27017/dbname
          - AUDIENCE=
          - ISSUER_BASE_URL=
        networks:
          - my_network 
    	
    
      frontend:
        build: ./frontend
        ports:
          - "3000:3000"
        environment:
          - DOMAIN=
          - CLIENT_ID=
          - REACT_APP_API_URL=http://backend:8000  # URL del backend
        networks:
          - my_network
    
      mongo:
        container_name: mongo
        image: mongo:latest
        restart: always
        ports:
          - "27017:27017"
        volumes:
          - mongo-data:/data/db
        networks:
          - my_network
    
    networks:
      my_network:
        driver: bridge
    
    volumes:
      mongo-data:
        driver: local
    

--- 
> Para ejecutar nuestro docker-compose usamos:

    docker-compose up --build
