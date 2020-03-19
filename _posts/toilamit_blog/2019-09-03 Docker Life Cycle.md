## Vòng đời của một docker container
Hình dưới đây mô tả vòng đời của một docker container, từ lúc create, run cho đến destroy

![Lifecyle of docker container](/wp-content/uploads/2019/08/Lifecycle-of-docker-container.png)

Một số các CLI commands cơ bản khi làm việc với docker containers

## Create container
Tạo mới một container, chỉ rõ image tương ứng. Docker sẽ được khởi động sau.

```
docker create --name <container-name> <image-name>
```

## Run docker container

Chạy container với các option: image, lệnh `/` , cờ `-d` để chạy container ở background

```
docker run -it -d --name <container-name> <image-name> bash</image-name></container-name></image-name></container-name>
```

![Magic of docker run](https://miro.medium.com/max/946/1*obzu32ZsInRqCr1mrQb5lA.jpeg)
Nguồn: http://www.slideshare.net/w_akram/docker-introduction-59904719

## Pause container
Dừng các tiến trình bên trong container

```
docker pause <container-id name="">
```

## Unpause container
Bỏ dừng các tiến trình bên trong container:

```
docker unpause <container-id name="">
```

## Start container
Khởi động container nếu nó đang ở trạng thái dừng

```
docker start <container-id name="">
```

## Stop container
Để dừng container và các tiến trình chạy bên trong container:

```
docker stop <container-id name="">
```

Để dừng tất cả các containers đang chạy:

```
docker stop $(docker ps -a -q)
```

## Restart container
Khởi động lại container cũng như các tiến trình bên trong container:

```
docker restart <container-id name="">
```

## Kill container

```
docker kill <container-id name="">
```

## Destroy container
Chỉ nên dùng khi mà container đã stop, không nên dùng khi container đang chạy.

```
docker rm <container-id name="">
```

## Xóa tất cả các containers đã dừng
```
docker rm $(docker ps -q -f status=exited)
```

