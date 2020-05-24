# Tenpo Test

## Idea general de la solución

Para encarar el problema propuesto se usó la siguiente estrategia

1. Infraestructura

    1. Mediante terraform se hace la creación de la infraestructura

    2. Terraform también crea las variables de entorno con los secretos necesarios en los linux de las VM

    3. Una vez terraform termina, ejecuta un comando en la maquina el cual descarga desde el repositorio el playbook de ansible

    4. Existen 2 playbooks de ansible, uno para la maquina con la api y otro para la maquina con base de datos.

    5. En algún momento pensé ejecutar ansible también desde local e ir aplicando el playbook de forma remota. No seguí esta idea ya que prefiero que la misma maquina sea la encargada de configurarse y no que otro supervisor tenga que hacerlo. Esto es mejor en el caso de tener muchos servidores ya que hace el trabajo mas paralelo

2. API 

    1. Se usó nodejs como lenguaje para la construcción de la api

    2. Para el login se utilizaron JWT para la session del usuario

    3. La forma de mantener un usuario logueado es mediante estos tokens

    4. No se usó federación de tokens ni definición de roles ya que era simplemente una api sencilla y ya requería de mas tiempo en la implementación

    5. Dado que los JWT no se pueden eliminar del cliente ya que es una api REST se optó por tener una lista blanca en memoria de los tokes creados y se les dió un tiempo de vida de 5 minutos. Soluciones mas extendibles podrían ser usando un caché distribuído como REDIS u otro.



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
1. Para que todo funcione se requiere contar con una cuenta en azure
2. Se debe crear una subscripción para terraform y obtener:
    1. **client_id**
    2. **tenant_id**
    3. **client_secret**
    4. **subscription_id**
3. Dentro de la carpeta scripts/terraform/ existe un archivo llamado **terraform.tfvars**. En el cuál se deben agregar las siguientes variables. En el cual se deben agregar las variables antes creadas
4. Las variables que usa la api ya están definidas en ese archivo por un tema de comodidad y claramente se podrían haber puesto en otro lado.
5. Se require Terraform v0.12.25 instalado



