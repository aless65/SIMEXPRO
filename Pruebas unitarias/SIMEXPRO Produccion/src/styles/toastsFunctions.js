import { toast } from 'react-toastify';

// TOAST DE EXITO CON MENSAJE PREDEFINIDO
export const ToastSuccess = () => {
  toast.success('Éxito. El proceso se completó correctamente.', {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

// TOAST DE EXITO CON MENSAJE PREDEFINIDO (guardar)
export const ToastSuccessGuardado = () => {
  toast.success('Éxito. El registro se guardó correctamente.', {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

// TOAST DE EXITO CON MENSAJE PREDEFINIDO (editar)
export const ToastSuccessEditar = () => {
  toast.success('Éxito. El registro se editó correctamente.', {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

// TOAST DE EXITO CON MENSAJE PREDEFINIDO (eliminar)
export const ToastSuccessEliminar = () => {
  toast.success('Éxito. El registro se eliminó correctamente.', {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

// TOAST DE ADVERTENCIA CON MENSAJE PREDEFINIDO DE QUE UN REGISTRO YA EXISTE.
export const ToastWarningYaExiste = () => {
  toast.warning('Advertencia. El registro que quiere ingresar ya existe.', {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

// TOAS DE ADVERTENCIA CON MENSJE PREDEFINIDO DE QUE LOS CAMPOS SE DEBEN LLENAR CORRECTAMENTE
export const ToastWarning = () => {
  toast.warning('Advertencia. Complete los campos correctamente.', {
    theme: 'dark',
    style: {
      backgroundColor: '#111827',
      zIndex: 1001, // Ajusta el z-index aquí
    },
    autoClose: 1500,
    closeOnClick: true
  });
}


export const ToastImg = () => {
  toast.warning('Advertencia. Seleccione una imagen', {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

// TOAST DE ERROR CON MENSAJE PREDEFINIDO
export const ToastError = () => {
  toast.error('Error. No se pudo completar el proceso.', {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

// TOAST DE ERROR CON MENSAJE PREDEFINIDO (registro en uso)
export const ToastErrorRegistroEnUso = () => {
  toast.warning('Error. El registro está en uso.', {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

// TOAST DE EXITO CON MENSAJE PERSNALIZADO
export const ToastSuccessPersonalizado = (message) => {
  toast.success(message, {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

// TOAST DE ERROR CON MENSAJE PERSONALIZADO
export const ToastErrorPersonalizado = (message) => {
  toast.error(message, {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

// TOAST DE ADVERTENCIA CON MENSAJE PERSONALIZADO
export const ToastWarningPersonalizado = (message) => {
  toast.warning(message, {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

// TOAST DE INFO CON MENSAJE PERSONALIZADO
export const ToastInfo = (message) => {
  toast.info(message, {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

// TOAST DEFAULT CON MENSAJE PERSONALIZADO
export const ToastDefault = (message) => {
  toast(message, {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}