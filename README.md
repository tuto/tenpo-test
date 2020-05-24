# Tenpo Test

## Estructura de archivos
 1. **api**: Api REST hecha en nodejs 
 2. **scripts**: Distintos scripts para los despliegues
    
    1. **ansible**: Playbooks de ansible para la configuración del sistema operativo de las VM
    
    2. **bash**: cookbooks que se ejecutaran una vez que las VM estén listas para ejectutar codigo, basicamente lo que hacen es:
        1. Instalan ansible
        2. Descargan el playbook para esa maquina
        3. Ejecutan el playbook de ansible
    
    3. **bd**: Comandos sql para crear el esquema de datos necesarios para la api

    4.**terraform**: Scripts en terraform necesarios para que se cree la infraestructura y la app se despliegue. 

## Supuestos
    
    1. Para que todo funcione se requiere contar con una cuenta en azure
    2. Se debe crear una subscripción para terraform y obtener:
        1. client_id
        2. tenant_id
        3. client_secret
        4. subscription_id
    3. Dentro de la carpeta scripts/terraform/ se debe crear un archivo llamado **terraform.tfvars**. En el cuál se deben agregar las siguientes variables 
    



## Requerimientos:
### Se require Terraform v0.12.25 instalado

