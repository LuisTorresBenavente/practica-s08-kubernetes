# Práctica S08 | AP6: Exposición de Servicios y Configuración Segura en Minikube

Proyecto práctico del curso **Orquestación y Automatización de Software** que implementa una arquitectura de dos capas (**Backend Node.js + MongoDB**) en Kubernetes (Minikube), desacoplando la configuración mediante `ConfigMaps` y `Secrets`, y exponiendo la API externamente vía `NodePort`.

## Estructura del Proyecto

```text
├── k8s/
│   ├── 01-app-configmap.yaml   # Variables de entorno no sensibles (DB_HOST, DB_NAME, APP_PORT)
│   ├── 02-db-secret.yaml       # Credenciales sensibles codificadas en Base64 (DB_USER, DB_PASS)
│   ├── 03-mongo-stack.yaml     # Deployment de MongoDB y Service interno ClusterIP
│   └── 04-backend-stack.yaml   # Deployment del Backend (envFrom) y Service externo NodePort
├── src/
│   ├── Dockerfile              # Imagen Docker basada en node:18-alpine
│   ├── index.js                # API Express conectada a MongoDB
│   └── package.json            # Dependencias del proyecto
└── README.md