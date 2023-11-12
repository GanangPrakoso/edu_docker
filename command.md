## Docker Command

- Images

  - List of images: `docker images`
  - Download image from DockerHub: `docker pull [image]:[version]`
  - Remove image: `docker image rm [image_id]`

- Container

  - List of running containers: `docker container ls`
  - List of all containers: `docker container ls -a`
  - Remove container: `docker container rm [container_id]`
  - Create container: `docker container create --name [containerName/ID] -p [localPort:containerPort] [imageName]`
  - Start container: `docker container start [containerName]`
  - Stop running container: `docker container stop [containerName/ID]`
  - Run container: `docker container run --name [containerName] -p [localPort:containerPort] [imageName]`
  - Run container with binding volume: `docker container run --name [containerName] -p [localPort:containerPort] -v $(pwd):[WORKDIR] [imageName] [CMD]`

  - Build Image
  - Build image: `docker build -t [imagename]:[version] ./`
