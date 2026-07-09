# Justificaciones técnicas

## 1. Atributo `pattern` en HTML frente a expresión regular en JavaScript

El atributo `pattern` permite declarar una regla de validación directamente en el marcado HTML. Esa regla se integra con la API de validación nativa del navegador y afecta propiedades como `validity.patternMismatch`, `checkValidity()` y el bloqueo del envío del formulario. En cambio, validar una expresión regular manualmente en JavaScript ofrece mayor control sobre la lógica, los casos especiales y el momento de ejecución, pero exige programar y mantener el flujo de error. En esta práctica se usa `pattern` para aprovechar la validación nativa y JavaScript para administrar mensajes, clases visuales y validaciones cruzadas.

## 2. Uso de `focusout` para mostrar errores por primera vez

Mostrar errores desde el primer evento `input` puede generar una experiencia agresiva, porque el usuario ve advertencias antes de terminar de escribir. El evento `focusout` permite esperar a que abandone el campo, momento en el que existe una intención más clara de haber completado ese dato. Por eso mejora la experiencia de usuario: se valida dinámicamente mientras escribe, pero los mensajes explícitos aparecen cuando el campo ya fue visitado y dejado.

## 3. Efecto de `setCustomValidity('')` en `validity.customError`

`setCustomValidity()` permite definir un error personalizado sobre un campo del formulario. Cuando se pasa un texto, `validity.customError` queda en `true` y el campo se considera inválido aunque cumpla otros atributos HTML. Al ejecutar `setCustomValidity('')`, el mensaje personalizado se limpia, `validity.customError` vuelve a `false` y el navegador puede evaluar el resto de reglas nativas. Esto es clave en la confirmación de contraseña, porque el formulario solo debe enviarse cuando ambos valores coinciden.

## 4. Pila de funciones y validación recursiva en `submit`

Si una función de validación se llama recursivamente dentro del evento `submit` sin una condición de salida clara, cada llamada queda apilada sobre la anterior en la pila de ejecución. Esto puede producir un crecimiento innecesario de llamadas y, en el peor caso, un desbordamiento de pila. En formularios, la validación debe ejecutarse de forma directa y finita: se revisan los campos, se actualiza la interfaz y se decide si se crea o no el objeto de datos.

## 5. Uso de `classList` frente a `element.style`

Usar `classList.toggle`, `classList.add` y `classList.remove` separa la lógica de comportamiento de la presentación visual. JavaScript decide qué estado tiene el campo, mientras CSS define cómo se ve ese estado. Modificar `element.style` directamente mezcla responsabilidades, dificulta el mantenimiento y obliga a repetir reglas visuales en el código. Con clases reutilizables como `.input-error` e `.input-success`, el diseño se mantiene consistente y puede ajustarse desde una sola hoja de estilos.
