# Stripe Webhooks - Docker

## docker up --rm -it stripe/stripe-cli:latest
## docker run --rm --entrypoint /bin/sh -it stripe/stripe-cli:latest
## stripe login
## autorizar acesso
## stripe listen --forward-to VERIFICAR_IP:3000/api/webhooks

# Verificar IP
## ifconfig -a
## procurar as informações do docker e verificar o ip 
## Exemplo: 
## docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500  
## inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
