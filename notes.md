# Intro To Docker

ref: [Links](https://www.docker.com/)

Dengan docker, tidak lagi ada alasan "tadi di komputer saya jalan kok". Docker menyelesaikan masalah perbedaan OS dan tools-version yang digunakan saat development aplikasi.

## Docker Basic Command

Overall kalian bisa pelajari dengan bantuan `--help` untuk setiap command. Misalnya: `docker --help` akan keluar command apa saja yang tersedia.

### Images

- `docker images`
  Menampilkan semua image yang ada di local
- `docker pull [imageName_from_dockerhub]:[tag]`
  Mengambil image dari dockerhub
- `docker image rm [imageName_in_local]`
  Menghapus image yang ada di local

### Containers

- `docker container ps`
  Menampilkan semua container yang sedang berjalan/run
- `docker containers ps -a`
  Menampilkan semua container yang ada, baik yang sedang berjalan/run atau yang mati/stop
- `docker container rm [containerName]`
  Menghapus container yang sudah berhenti dan tidak digunakan

### Create Container

Kita akan membuat dan menjalankan mongodb di docker.

- `docker container create --name [containerName] -p [localPort:containerPort] [image_name]`
  Digunakan untuk membuat container baru dengan image yang sudah ada.

### Start Container

- `docker container start [containerName]`
  Menjalankan/run container yang sudah dibuat
- `docker container stop [containerName]`
- Memberhentikan container yang sedang jalan/run

### Run Container

- `docker container run -p [localPort:containerPort] [image_name]` digunakan untuk membuat dan langsung run container yang diinginkan

## Create your Docker Images

### Setup

Ketika membuat docker image yang berisi aplikasi kita, kita perlu membuat file `Dockerfile` berisi konfigurasi aplikasi seperti image apa saja yang diperlukan dan mendefinisikan bagaimana cara menjalankan aplikasi tersebut.

```Dockerfile
# based image yang akan digunakan
FROM node:16.13

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /usr/local/app

# untuk set ENV dalam aplikasi kita
ENV PORT=4002

# copy deps yang ada di apps ke WORKDIR
COPY package.json package-lock.json /usr/local/app/

# Install npm & Mengapus cache
RUN npm install && npm cache clean --force

# 2 install setup for development
RUN npm install -g nodemon

# copy semua file & folder ke WORKDIR
COPY ./ ./

# execute apps: production
CMD ["npm", "run", "start"]

```

Kalian juga bisa membuat .dockerignore supaya dalam container tidak berisi hal yang tidak diperlukan:

```.dockerignore
node_modules
Dockerfile
```

Kemudian build aplikasi kita menjadi sebuah image dengan:

`docker build -t [image_name]:[version] [path_Dockerfile]`

> `docker build -t wikanyaa/intro-to-docker:1.0 ./`

### Create and Run Container\*\*

`docker container run --name [containerName] -p [localPort:containerPort] [image_name]`

Cara ini digunakan jika kamu ingin membuat container sekaligus menjalankan containernya.
`-d` digunakan supaya container dijalankan di background sistem.

## Docker image for development

Saat development, tentunya kita sering melakukan perubahan code dan restart aplikasi di local. Jika kalian menggunakan `run` atau `container start`, container yang berisi aplikasi kalian tidak akan update.

Untuk hal ini, kita bisa menggunakan _bind mount a volume_ `-v [localPath]:[WORKDIR]` sehingga setiap perubahan yang terjadi di local, terjadi juga perubahannya di container.

Sama halnya ketika development, kita bisa menggunakan `nodemon` saat running aplikasi, sehingga setiap perubahan bisa langsung reload. Kalian bisa build ulang image sebelumnya dengan menambahkan cmd baru untuk install nodemon:

```md
RUN npm install -g nodemon
```

### Binding local code to volume docker image

`docker container run --name [containerName] -p [localPath:containerPath] -v $(pwd):[WORKDIR] [image_name] [CMD]`

> `docker container run --name introToDocker -p 4002:4002 -v $(pwd):/usr/local/app wikanyaa/express-demo:1.0`

## Docker Compose

Kita dapat menggunakan `Docker Compose` untuk menjalankan aplikasi multi-kontainer di Docker yang ditentukan menggunakan format file `docker-compose.yml`. File Compose ini digunakan untuk menentukan bagaimana satu atau lebih kontainer yang saling terkait dapat dijalankan dengan sebuah command.

Contoh:

```docker-compose.yml
version: "3.6"

services:
    app-service:
        build: ./services/app
        ports:
            - "4002:4002"
        volumes:
            - ./services/app:/usr/local/app
    user-service:
        build: ./services/user
        ports:
            - "4001:4001"
        volumes:
            - ./services/user:/usr/local/user
```

untuk catatan, volumes digunakan untuk melakukan binding volume, antara folder yang ada di local dengan folder yang ada di workdir container docker. Gunakan binding volume untuk proses development, agar perubahan yang kita lakukan di local file kita dapat tersinkronisasikan di container docker.

## Deploy Dockerizing to AWS

1. Buatlah file `Dockerfile` dan `.dockerignore` pada setiap aplikasi yang ingin kita deploy. Contoh: `app`, `user`, dan `orchestrator`

2. Buatlah file `docker-compose.yml` pada root folder aplikasi. Untuk kebutuhan challenge buat di folder `server`.
   contoh:

```docker-compose.yml
services:
    app-service:
        build: ./services/app
        ports:
            - "4002:4002"
        environment:
            MY_SECRET_KEY: ${MY_SECRET_KEY}
    user-service:
        build: ./services/user
        ports:
            - "4001:4001"
```

untuk kebutuhan deployment, kita tidak perlu menggunakan `binding volume` jadi keyword `volumes` dapat kita hapus. Kita juga dapat menambahkan environment variable dalam file `docker-compose.yml` ini menggunakan keyword `environment` seperti contoh di atas.

3. Buat instance baru di akun aws kita

4. Connect ke instance tersebut melalui terminal dan install `Docker` melalui terminal sebagai berikut:

```shell
$ sudo apt-get update

# install curl
$ sudo apt-get install curl

# install docker
$ curl -fsSL https://get.docker.com/ | sh
```

5. Clone repo yang hendak kita deploy dari github

6. Masuk ke folder server yang hendak di deploy, folder dimana file `docker-compose.yml` berada

7. Buat file `.env` dan masukan environment variable yang kamu butuhkan, seperti `DATABASE_URL` dan lain sebagainya.

8. Jalankan `docker compose up -d` untuk menjalankan semua aplikasi. Opsi `-d` membuat docker menjalankan kontainer kita di background. Apabila hendak menghapus dan menstop container lakukan perintah `docker compose down`

9. Pergi ke aws console dan buka instance awsnya, kita perlu membuka `port instance` sesuai dengan yang diperlukan. Cari menu `security` dan buka halaman `Security groups`. Tambahkan inbound rules dengan mengklik button `Edit inbound rules`. Tambahkan port yang sesuai kebutuhan. Contoh

```
type: Custom TCP
Port Range: 4001 (sesuaikan dengan kebutuhan)
Source: Custom, Buat agar dapat diakses darimanapun (0.0.0.0/0)
```

10. Sekarang aplikasi kamu sudah dapat diakses di url: `http://<ip-address>:<port>`

11. Jika ada update, kita dapat melakukan pull code terbaru dari github, setelah itu lakukan comment:
    `docker compose up --force-recreate --build -d`. Opsi `--build` digunakan untuk me-rebuild image menjadi yang terupdate, dan opsi `--force-recreate` membuat container di create ulang.
