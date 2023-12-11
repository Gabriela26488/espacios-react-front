
# Sistema "Espacios de Trabajo" frontend.


Un sistema reservar espacios de trabajo. Desarrollado con vite, react js, botstrap 5.

## Instalación

Debe de descargar el sistema y dentro de la carpeta de este ejecutar el comando npm install.

```bash
  npm install
```

Luego debe de configurar la direccion url del backend en el archivo src/backend.jsx en la variable "url",
es necesario colocar /api al final de la direccion.

```javascript
const url = "http://direccionbackend/"
```

Para arrancar el sistema se debe ejecutar en la consola el comando:
```bash
  npm run dev
```

Los datos del usuario administrador son:
```bash
  correo: admin@mail.com
  contraseña: 12345678
```

## Funcionamiento

### Inicio de sesión y registrar una cuenta
Para iniciar sesion colocamos los datos del usuario en el apartado de "iniciar sesion".

Para registrar una cuenta damos click en el apartado "No tienes cuenta? Registrate aquí" y llenamos el formulario.

### Inicio
En la pantalla de inicio podemos ver la lista de reservaciones que se han hecho.

### Reservar espacio de trabajo
Para reservar un espacio de trabajo nos vamos al apartado de reservar, damos click en ubicación para seleccionar nuestra ubicación y luego llenamos el formulario con la fecha y la hora. Al hacer click en aceptar podemos ver el mapa con las ubicaciones cercanas a nuestra ubicación y al hacer click en alguna de ellas podemos ver sus detalles y dar click en reservar

### Crear espacio de trabajo
Para crear un espacio de trabajo debemos estar autenticados como administrador, nos vamos al apartado de espacios. En el apartado podemos ver la lista de todos los espacios creados y para agregar un espacio nuevo damos click al botón verde con el signo de "+" que se encuentra en la parte inferior derecha. Abrimos el formulario con el título "Crear Espacio de Trabajo" llenamos los datos y damos click en aceptar, cabe señalar que para establecer una ubicación debemos dar click al campo con el mismo nombre y se despliega una ventana modal con el mapa donde debemos dar click a la ubicación.
