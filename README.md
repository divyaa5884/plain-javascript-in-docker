# plain-javascript-in-docker
JavaScript + HTML to render Hello Page 


IMPORTANT NOTES:

    1. The backend endpoint host url can be accessed using "API_URL" property (mentioned in env.js). An example is shown in index.js.
    2. PLEASE USE THIS PROPERTY ("API_URL") WHEN YOU ARE TRYING TO CALL A BACKEND API. 
    3. When testing in your local environment, please change API_URL to http://localhost:8080.
    4. Before committing your solution, ENSURE THAT YOU CHANGE THE API_URL TO 'http://restapi:8080' ELSE YOUR SUBMISSION WILL NOT BE SCORED.
    5. Also, ensure that env.js must be the first file that must be loaded so that API_URL is accessible in subsequent files.
    6. Make sure you follow the steps mentioned under "PROJECT START STEPS" and ensure that the steps execute successfully. 
    7. Make sure you follow the steps mentioned under "DOCKER START STEPS" and ensure that the steps execute successfully. 


PROJECT START STEPS:

    Pre-requisites:
    1. Install http-server module (https://www.npmjs.com/package/http-server).

    Steps:
    1. To run this application, do the following:
        1.a. Go to the project root directory.
        1.b. Run the following command(s) in the terminal/command line:    
            - http-server ./ -p 4200 -a 0.0.0.0
    
    2. Go to http://localhost:4200 in your browser to view it.


DOCKER START STEPS:

    Pre-requisites:
    1. Docker is installed (http://console.codejudge.io/setup)

    Steps:
    1. Build the docker image:
        1.a. Go to the project root directory.
        1.b. Run the following command(s) in the terminal/command line:
            - docker build -t cj-app .

    2. Run the image in a container (Make sure port 4200 is available):        
        2.a. Run the following command(s) in the terminal/command line:
            - docker run -i -p4200:4200 cj-app
        2.b. Check the logs for any errors. 

    3. Go to http://localhost:4200 in your browser to view it.

DOCKER STOP STEPS:

    Steps:
    1. Run the following commands:
        - docker ps
    2. Copy the container id and run the below command:
        - docker stop <container_id> 
        - docker system prune

DOCKER LOGS:

    Steps:
    1. Run the following commans(s):
        - docker ps
    2. Copy the container id and run the below command:
        - docker logs <container_id>

DOCKER REMOVE CONTAINER:

    Steps:
    1. Run the following command(s):
        - docker ps
    2. Copy the container id and run the below command:
        - docker rm <container_id>
        - docker system prune

DOCKER REMOVE IMAGE:

    Steps:
    1. Run the following command(s):
        - docker ps
    2. Copy the image id and run the below command:
        - docker rmi <image_id>
        - docker system prune
