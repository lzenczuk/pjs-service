### Run ###

Order of executing commands is important

1. run spark - gradlew run
2. build client app - gulp watch
3. in defaulf.conf file change ip to external ip of your local machine
4. update paths in docker run commands
5. run nginx

sudo docker run --name phs -v /home/dev/Documents/java-sandbox/phantomjs-service/ui/www:/usr/share/nginx/html:ro -v /home/dev/Documents/java-sandbox/phantomjs-service/nginx/default.conf:/etc/nginx/conf.d/default.conf:ro -d -p 8080:80 nginx

### Setup nginx ###

sudo docker run --name phs-nginx -d -p 8080:80 nginx

sudo docker cp phs-nginx:/etc/nginx/nginx.conf nginx.conf

sudo chown -R dev:dev nginx.conf

