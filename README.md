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


## Requerimientos:
### Se require Terraform v0.12.25 instalado

