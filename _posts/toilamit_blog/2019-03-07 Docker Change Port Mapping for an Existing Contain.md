Docker Change Port Mapping for an Existing Container
posted in DOCKER    by Rohit Mohta
Have you ever been in a situation where you forgot to “expose” a port for your container, or you’d like to change the port mapping for an existing container? I know I have been!!

When you perform a quick google search, most common answer’s are

you cannot do that! You’ll have to create a new container with proper port mapping
create an image of your existing container. Then use “docker run” with your desired port mapping for your “newly created” image.
Among those answers, a saint would have mentioned – it’s possible. But you’d have to do some extra work. So here I’m, telling you – yep, it’s possible. I have tried it and it works. For steps, see the linked answer written by “holdfenytolvaj”.

Here, I’ll explain, what needs to be changed in order for you to modify port mapping. I would like to (in my case) expose port 8888 from my docker container.

In my case, I would like to expose an additional port – 8888 – from my docker container.

Step 1: Using “docker inspect” get details about current port mapping. This will be seen under “NetworkSettings”. And “PortBindings” under “HostConfig”.

"Ports": {
 "80/tcp": [ 
{
 "HostIp": "0.0.0.0",
 "HostPort": "80"
 }
]
 },
 

The above snippet (from NetworkSettings.Port) declares – expose port 80 from my docker container to port 80 (on every network device) in my docker host machine.

NOTE: Stop the container and docker engine before editing the below files.

Step 2:  Edit the config.v2.json file as shown below

(a) Update entry for “ExposedPorts”

(b) Update entry for “Ports”

$ vi /var/lib/docker/containers//config.v2.json
...
{
"Config": {
....
"ExposedPorts": {
"80/tcp": {},
"8888/tcp": {}
},
....
},
"NetworkSettings": {
....
"Ports": {
 "80/tcp": [
 {
 "HostIp": "",
 "HostPort": "80"
 }
 ],
 "8888/tcp": [
 {
 "HostIp": "",
 "HostPort": "8888"
 }
 ]
 },
....
}
In the above snippet, I have included one more port – 8888 –  to be exposed as *:8888 on my host machine.

Step 3:  Edit the hostconfig.json file as shown below

(a) Update entry for “PortBindings”

$ vi /var/lib/docker/containers//hostconfig.json
{
....
 "PortBindings": {
 "80/tcp": [
 {
 "HostIp": "",
 "HostPort": "80"
 }
 ],
 "8888/tcp": [
 {
 "HostIp": "",
 "HostPort": "8888"
 }
 ]
 },
.....
}
Save the file. Re-start your docker engine (docker service via systemctl). Verify docker engine has started successfully, without any errors.

Start your container.

When you execute “docker ps” command, the PORTS column should show the updated port mapping details.