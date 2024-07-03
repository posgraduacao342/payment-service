# Pipeline

## Minikube
- minikube start
- minikube stop
- minikube status
- minikube service tech-challenge-payment-service --url

## Executar os comandos para inicializar os pods
- cd 
- kubectl apply -f pipeline/application

## Comandos para vizualizar os pods executando
- kubectl get pod --watch

## Comando para limpar o cluster
- kubectl delete --all deployment
- kubectl delete --all pod
- kubectl delete --all secrets
- kubectl delete --all svc

## Execute o comando abaixo para abrir a url que tem conexão com o pod
- minikube service tech-challenge-payment-service --url
- minikube service tech-challenge-payment-service
- Swagger: http://<Ip>:30001/swagger-ui/index.html