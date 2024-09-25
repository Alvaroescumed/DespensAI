# Inicio de Proyecto DespensAI

## Introducción

Este documento proporciona instrucciones para clonar y configurar el entorno de desarrollo para una aplicación móvil desarrollada en React Native, con un backend en Django. La aplicación se ejecutará en emuladores de Android e iOS y utilizará una base de datos MySQL.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas en tu máquina:

1. **Node.js** (versión 14 o superior)
2. **React Native CLI**
3. **Django** (versión 3.2 o superior)
4. **Python** (versión 3.8 o superior)
5. **MySQL** (versión 5.7 o superior)
6. **Android Studio** y/o **Xcode** (para emuladores)
7. **Conda** (disponible a través de Anaconda o Miniconda)

## Clonación del Proyecto

1. **Clona el repositorio**: Usa el siguiente comando para clonar el proyecto desde el repositorio de GitHub:
    
    ```bash
    git clone https://github.com/Alvaroescumed/DespensAI.git
    ```
    
2. **Navega al directorio del proyecto**:
    
    ```bash
    cd DespensAI
    ```
    

## Configuración del Entorno

### 1. Configuración del Entorno para React Native

### a. Instalación de Node.js y React Native CLI

- **Node.js**: Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **React Native CLI**: Una vez que tengas Node.js instalado, ejecuta el siguiente comando en la terminal:
    
    ```bash
    npm install -g react-native-cli
    ```
    

### b. Instalación de Dependencias del Proyecto

En el directorio del proyecto, instala las dependencias necesarias:

```bash
npm install
```

### 2. Configuración del Backend en Django

### a. Instalación de Python y Django con Conda

1. **Crea un nuevo entorno virtual usando Conda**:
    
    ```bash
    conda create --name nombre_del_entorno
    ```
    
2. **Activa el entorno**:
    
    ```bash
    conda activate nombre_del_entorno
    ```
    
3. **Instala Django dentro del entorno**:
    
    ```bash
    pip install django
    ```
    

### b. Instalación de Dependencias del Backend

En el directorio del backend (si es un subdirectorio, navega a ese directorio), instala las dependencias necesarias:

```bash
pip install -r requirements.txt
```

### 3. Instalación de MySQL y Configuración de la Base de Datos

1. **Instala MySQL**: Sigue las instrucciones en [mysql.com](https://www.mysql.com/downloads/).
2. **Crea una nueva base de datos**: Usa MySQL Workbench o la línea de comandos para crear una base de datos para tu proyecto.

### 4. Configuración del Archivo .env

Crea un archivo `.env` en el directorio raíz del proyecto Django y añade la configuración de la base de datos:

```
env
Copiar código
DATABASE_NAME=nombre_de_la_base_de_datos
DATABASE_USER=tu_usuario
DATABASE_PASSWORD=tu_contraseña
DATABASE_HOST=localhost
DATABASE_PORT=3306

```

### 5. Configuración de Django para Usar MySQL

Edita el archivo `settings.py` en el directorio de tu proyecto Django:

```python

import os
from pathlib import Path

# Configuración de la base de datos
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('DATABASE_NAME'),
        'USER': os.getenv('DATABASE_USER'),
        'PASSWORD': os.getenv('DATABASE_PASSWORD'),
        'HOST': os.getenv('DATABASE_HOST'),
        'PORT': os.getenv('DATABASE_PORT'),
    }
}

```

## Arrancar el Servidor

Para arrancar el servidor de Django, asegúrate de estar en el directorio del proyecto Django y ejecuta:

```bash
python manage.py runserver 0.0.0.0:8000
```

## Ejecutar la Aplicación en Emuladores

### Para Android

1. Abre Android Studio y asegúrate de tener un emulador configurado.
2. En el directorio del proyecto React Native, ejecuta:
    
    ```bash
    npx react-native run-android
    ```
    

### Para iOS

1. Abre Xcode y configura un simulador.
2. En el directorio del proyecto React Native, ejecuta:
    
    ```bash
    npx react-native run-ios
    ```
