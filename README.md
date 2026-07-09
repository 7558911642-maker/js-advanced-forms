# Validación avanzada de formularios y eventos DOM

Proyecto web creado para una guía de laboratorio sobre validación avanzada de formularios, eventos del DOM y manejo de estados visuales con HTML5, CSS3 y JavaScript puro.

## Tecnologías usadas

- HTML5
- CSS3
- JavaScript

## Estructura de carpetas

```text
js-advanced-forms/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── docs/
│   ├── justificaciones.md
│   └── justificaciones.html
└── README.md
```

## Funcionalidades implementadas

- Formulario semántico y accesible con etiquetas `label` asociadas a cada campo.
- Ocho campos obligatorios: nombre completo, usuario, email, fecha de nacimiento, país, password, confirmación de password y aceptación de términos.
- Validación nativa con `required`, `type`, `minlength` y `pattern`.
- Mensajes de ayuda y mensajes de error específicos por campo.
- Clases visuales `.input-error` e `.input-success` para representar estado inválido o válido.
- Validación cruzada de contraseña y confirmación con `setCustomValidity()`.
- Creación de un objeto literal `formData` al registrar correctamente.
- Visualización del resultado en consola con `console.table(formData)`.
- Limpieza de clases, mensajes y estado visual al usar el botón reset.

## Eventos usados

- `input`: valida dinámicamente campos de texto, email, fecha, password y confirmación mientras el usuario escribe.
- `focusout`: muestra mensajes de error cuando el usuario abandona un campo vacío o mal completado.
- `submit`: intercepta el envío con `preventDefault()`, valida todo el formulario y crea el objeto final solo si los datos son válidos.

## Instrucciones para ejecutar el proyecto

1. Descargue o clone el repositorio.
2. Abra la carpeta del proyecto.
3. Ejecute `index.html` directamente en el navegador.
4. Complete el formulario y revise la consola del navegador para ver `console.table(formData)` después de un registro válido.

No se requieren dependencias, instalación de paquetes ni servidor local.

## Instrucciones para subirlo a GitHub

1. Cree un repositorio público llamado `js-advanced-forms`.
2. Inicialice Git en la carpeta del proyecto.
3. Realice al menos tres commits descriptivos.
4. Conecte el repositorio local con el remoto.
5. Envíe la rama principal a GitHub.

## Comandos sugeridos para los 3 commits mínimos

```bash
git init
git add .
git commit -m "Crear estructura inicial del formulario"
git add .
git commit -m "Implementar estilos y validaciones visuales"
git add .
git commit -m "Agregar eventos DOM, validación cruzada y documentación"
git branch -M main
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
```
