# 🔒 SISTEMA DE BLOQUEO POR PAGO - MODAL INTRUSIVO

## 📋 Descripción

Este sistema bloquea **completamente** el acceso a la página web "Love on the Brain" con un **modal intrusivo que no se puede cerrar** hasta que se complete el pago del proyecto.

## ⚙️ Configuración

### Para ACTIVAR el bloqueo:
1. Abrir el archivo: `frontend/src/config/payment.ts`
2. Cambiar `isPaid: false` a `isPaid: true`
3. Guardar el archivo
4. Hacer build: `npm run build`
5. Desplegar

### Para DESACTIVAR el bloqueo:
1. Abrir el archivo: `frontend/src/config/payment.ts`
2. Cambiar `isPaid: true` a `isPaid: false`
3. Guardar el archivo
4. Hacer build: `npm run build`
5. Desplegar

## 📊 Información del Proyecto

- **Proyecto**: Love on the Brain
- **Monto**: €25,000
- **Vencimiento**: 31 de enero de 2024
- **Desarrollador**: José Juan Pérez González
- **Email**: joseperezglz01@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/jose-juan-perez-gonzalez/
- **GitHub**: https://github.com/josewalke

## 🚀 Cómo Funciona

1. **Al cargar la página**: Se verifica el estado del pago
2. **Si no han pagado**: Se muestra modal intrusivo **INCLOSABLE**
3. **Si han pagado**: Se muestra la página normal
4. **Verificación automática**: Cada 5 minutos

## 🎯 Modal de Bloqueo Intrusivo

### Características del Modal:
- ✅ **NO SE PUEDE CERRAR** - Modal permanente
- ✅ **BLOQUEA TODA INTERACCIÓN** - No se puede hacer nada
- ✅ **PREVIENE ESCAPE** - Teclas bloqueadas (ESC, F5, etc.)
- ✅ **PREVIENE CLIC DERECHO** - Menú contextual bloqueado
- ✅ **PREVIENE SCROLL** - Página completamente bloqueada
- ✅ **PREVIENE SELECCIÓN** - Texto no seleccionable
- ✅ **DOBLE OVERLAY** - Dos capas de seguridad

### Información Mostrada:
- 🔒 **Header prominente** con icono de candado
- 📋 **Detalles del proyecto** (nombre, monto, vencimiento)
- 📞 **Información de contacto** completa
- 💳 **Métodos de pago** aceptados
- ⚠️ **Advertencia final** de bloqueo permanente

## 💳 Métodos de Pago

- 🏦 Transferencia bancaria
- 💳 PayPal
- 💳 Stripe
- 📱 Bizum

## ⚠️ Características de Seguridad

### Bloqueos Implementados:
- **Teclas**: Todas las teclas bloqueadas (ESC, F5, Ctrl+W, etc.)
- **Mouse**: Clic derecho bloqueado
- **Touch**: Gestos táctiles bloqueados
- **Scroll**: Scroll de página bloqueado
- **Selección**: Texto no seleccionable
- **Overlay**: Doble capa de overlay para mayor seguridad

### Imposible de Bypassear:
- ✅ **No se puede cerrar** con ESC
- ✅ **No se puede recargar** con F5
- ✅ **No se puede cerrar** con Ctrl+W
- ✅ **No se puede hacer clic** fuera del modal
- ✅ **No se puede usar** clic derecho
- ✅ **No se puede hacer** nada hasta pagar

## 🔧 Archivos Modificados

- `frontend/src/config/payment.ts` - Configuración del pago
- `frontend/src/hooks/usePayment.ts` - Hook de verificación
- `frontend/src/components/PaymentRequired.tsx` - Modal intrusivo
- `frontend/App.tsx` - Lógica de bloqueo

## 📝 Notas Importantes

- **Modal intrusivo** - No se puede cerrar ni interactuar
- **Bloqueo total** - Imposible acceder a la página
- **Solo frontend** - No requiere backend
- **Fácil activación** - Una línea de código
- **Seguridad máxima** - Múltiples capas de protección

## 🎯 Experiencia del Usuario

### Si NO han pagado:
1. **Carga la página** → Modal intrusivo aparece
2. **Intenta cerrar** → Imposible (todas las opciones bloqueadas)
3. **Intenta interactuar** → Imposible (todo bloqueado)
4. **Solo puede** → Leer la información y contactar para pagar
5. **Página bloqueada** → Hasta que cambies `isPaid: true`

### Si SÍ han pagado:
1. **Carga la página** → Página normal sin modal
2. **Usa todas las funcionalidades** → Sin restricciones
3. **Experiencia completa** → Como si no hubiera bloqueo

## 🔒 Nivel de Seguridad: MÁXIMO

Este sistema proporciona el **máximo nivel de bloqueo** posible en una aplicación web frontend. El usuario **NO PUEDE** hacer nada hasta que se complete el pago.
