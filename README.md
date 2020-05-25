# Tenpo Test

## Idea general de la solución

Para encarar el problema propuesto se usó la siguiente estrategia

1. Infraestructura

    1. Mediante terraform se hace la creación de la infraestructura y la inicialización de la carga de la configuración mediante la instalación de **ansible**

    2. Se prefirió de esta forma ya que al solo usar terraform como maestro para todo después es super simple de llevar a un servidor de integración contunua como JENKINS, CIRCLE, etc.

    3. Terraform también crea las variables de entorno con los secretos necesarios en los linux de las VM

    4. Una vez terraform termina, ejecuta un comando en la maquina el cual descarga desde el repositorio el playbook de ansible

    5. Existen 2 playbooks de ansible, uno para la maquina con la api y otro para la maquina con base de datos.

    6. En algún momento pensé ejecutar ansible también desde local e ir aplicando el playbook de forma remota. No seguí esta idea ya que prefiero que la misma maquina sea la encargada de configurarse y no que otro supervisor tenga que hacerlo. Esto es mejor en el caso de tener muchos servidores ya que hace el trabajo mas paralelo

2. API 

    1. Se usó nodejs como lenguaje para la construcción de la api y corre sobre docker-compose

    2. Para el login se utilizaron JWT para la session del usuario

    3. La forma de mantener un usuario logueado es mediante estos tokens

    4. No se usó federación de tokens ni definición de roles ya que era simplemente una api sencilla y ya requería de mas tiempo en la implementación

    5. Dado que los JWT no se pueden eliminar del cliente ya que es una api REST se optó por tener una lista blanca en memoria de los tokens creados y se les dió un tiempo de vida de 5 minutos. Soluciones mas extendibles podrían ser usando un caché distribuído como REDIS u otro.

    6. Se usó TDD como metodología de desarrollo y se logró una covertura de pruebas como se indica abajo
    ```
    -----------------|---------|----------|---------|---------|-------------------
    File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
    -----------------|---------|----------|---------|---------|-------------------
    All files        |   98.44 |     88.1 |   95.83 |   98.43 |                   
    api              |      85 |        0 |       0 |      85 |                   
    server.js        |      85 |        0 |       0 |      85 | 17-22             
    api/clients      |     100 |     87.5 |     100 |     100 |                   
    db.js            |     100 |     87.5 |     100 |     100 | 76                
    pool.js          |     100 |      100 |     100 |     100 |                   
    api/controllers  |     100 |      100 |     100 |     100 |                   
    users.js         |     100 |      100 |     100 |     100 |                   
    api/utils        |     100 |      100 |     100 |     100 |                   
    config.js        |     100 |      100 |     100 |     100 |                   
    crypter.js       |     100 |      100 |     100 |     100 |                   
    validates.js     |     100 |      100 |     100 |     100 |                   
    -----------------|---------|----------|---------|---------|------------------- 
    ```

3. Base de datos

    1. En la especificación del problema no decía que tenía que estar en un contenedor así que se instaló simplemente en el sistema base

    2. No se usó ninguna topología compleja de red como por ejemplo un proxy entre la BD y la app

    3. Simplemente se abrió el puerto 5342 de postgres y se permitió la conexión remota

    4. Esto es una práctica no recomendada por los problemas de seguridad pero se consideró suficiente para el test.

    5. Se le dió un label DNS a la maquina para poder ser identificada desde la API

    6. La creación de la db y el modelo se hace mediante ansible y considera todo el modelo y los datos necesarios para comenzar a funcionar


## Estructura de archivos

 1. **api**: Api REST hecha en nodejs 
 2. **scripts**: Distintos scripts para los despliegues
    
    1. **ansible**: Playbooks de ansible para la configuración del sistema operativo de las VM
    
    2. **bash**: cookbooks que se ejecutaran una vez que las VM estén listas para ejectutar codigo, basicamente lo que hacen es:
        1. Instalan ansible
        2. Descargan el playbook para esa maquina
        3. Ejecutan el playbook de ansible
    
    3. **bd**: Comandos sql para crear el esquema de datos necesarios para la api

    4. **terraform**: Scripts en terraform necesarios para que se cree la infraestructura y la app se despliegue. 

## Requerimientos

1. Descargar el código desde https://github.com/tuto/tenpo-test
2. Para que todo funcione se requiere contar con una cuenta en azure
3. Se debe crear una subscripción para terraform y obtener:
    1. **client_id**
    2. **tenant_id**
    3. **client_secret**
    4. **subscription_id**
4. Dentro de la carpeta scripts/terraform/ existe un archivo llamado **terraform.tfvars**. En el cuál se deben agregar las siguientes variables. En el cual se deben agregar las variables antes creadas
5. Las variables que usa la api ya están definidas en ese archivo por un tema de comodidad y claramente se podrían haber puesto en otro lado.
6. Se require Terraform v0.12.25 instalado


## Funcionamiento

### Infraestructura

1. Comandos para crear la infraestructura

```
$ git clone https://github.com/tuto/tenpo-test.git
$ cd scripts/terraform
$ AGREGAR LAS VARIABLES EN terraform.tfvars
$ terraform init
$ terraform apply
```

### API

#### Register

Para registrarse como usuario se puede hacer mediante curl:

```
curl -d '{"email":"mail@gmail.com", "password":"value2", "name":"nombre", "last_name":"apellido"}' -H "Content-Type: application/json" -X POST http://myterraformpublicipdbtenpoapi.eastus.cloudapp.azure.com:3000/register --verbose

```

Si todo sale bien debemos recibir un código http 201

#### Login

Para loguearse es necesario haberse registrado primero, si lo hicimos el comando sería nuevamente usando curl 

```

curl -d '{"email":"jlueiza@gmail.com", "password":"value2"}' -H "Content-Type: application/json" -X POST http://myterraformpublicipdbtenpoapi:3000/login --verbose

```

Si todo sale bien recibiremos un token de respuesta. Este token es necesario para los servicios que son logueados(suma)

#### Suma

Para sumar es necesario estar logueado y enviar el token. Mas los números que se quieren sumar.

```

curl -d '{"n1":2, "n2":3, "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpsdWVpemFAZ21haWwuY29tIiwibmFtZSI6Im5vbWJyZSIsImxhc3RfbmFtZSI6ImFwZWxsaWRvIiwiaWF0IjoxNTkwMjA5MzQ3LCJleHAiOjE1OTAyMDk2NDd9.3DF5frAHYhYrnEKu0tKXlx1nqch6GN7oeTZ1VbJcyYQ"}' -H "Content-Type: application/json" -X POST http://localhost:8080/suma --verbose

```



