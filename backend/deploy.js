// deploy on amazon ec2
// run: node deploy.js


// step by step deploy on amazon ec2
// 1. create amazon ec2 instance
// 2. connect to ec2 instance
// 3. install nodejs
// 4. install mongodb
// 5. install git
// 6. clone project from github
// 7. install npm packages
// 8. run project
// 9. install nginx
// 10. configure nginx
// 11. start nginx
// 12. run project on port 80
// 13. install pm2
// 14. run project using pm2
// 15. configure pm2 to run on startup
// 16. configure nginx to run on startup
// 17. configure mongodb to run on startup
// 18. configure ec2 instance to run on startup
    
// terminal commands for all steps
// ssh -i "aws-ec2.pem" ubuntu@<ec2-instance-public-ip> 
// sudo apt-get update
// sudo apt-get install nodejs
// sudo apt-get install npm
// sudo apt-get install mongodb
// sudo apt-get install git
// git clone
// cd <project-name>
// npm install
// node app.js
// sudo apt-get install nginx
// sudo nano /etc/nginx/sites-available/default
// sudo service nginx start
// sudo service nginx status
// sudo service nginx stop
// sudo install pm2 -g
// pm2 start app.js
// pm2 startup systemd
// sudo systemctl status pm2
// sudo systemctl status nginx
// sudo systemctl status mongod
// sudo systemctl enable pm2
// sudo systemctl enable nginx
// sudo systemctl enable mongod
// sudo reboot
// sudo systemctl restart pm2
// sudo systemctl restart nginx
// sudo systemctl restart mongod
// sudo systemctl daemon-reload


// steps to deploy on digital ocean droplet
// 1. create digital ocean droplet
// 2. connect to droplet
// 3. install nodejs
// 4. install mongodb
// 5. install git
// 6. clone project from github
// 7. install npm packages
// 8. run project
// 9. install nginx
// 10. configure nginx
// 11. start nginx
// 12. run project on port 80
// 13. install pm2
// 14. run project using pm2
// 15. configure pm2 to run on startup
// 16. configure nginx to run on startup
// 17. configure mongodb to run on startup
// 18. configure droplet to run on startup

// terminal commands for all steps
// ssh root@<droplet-ip>
// sudo apt-get update
// sudo apt-get install nodejs
// sudo apt-get install npm
// sudo apt-get install mongodb
// sudo apt-get install git
// git clone
// cd <project-name>
// npm install
// node app.js
// sudo apt-get install nginx
// sudo nano /etc/nginx/sites-available/default
// sudo service nginx start
// sudo service nginx status
// sudo service nginx stop
// sudo install pm2 -g
// pm2 start app.js
// pm2 startup systemd
// sudo systemctl status pm2
// sudo systemctl status nginx
// sudo systemctl status mongod
// sudo systemctl enable pm2
// sudo systemctl enable nginx
// sudo systemctl enable mongod
// sudo reboot
// sudo systemctl restart pm2
// sudo systemctl restart nginx
// sudo systemctl restart mongod
// sudo systemctl daemon-reload