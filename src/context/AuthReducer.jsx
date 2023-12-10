export default function authReducer(state, action) {
  switch (action.type) {
    case "INICIAR_SESION":
      return action.payload;

    case "CERRAR_SESION":
      return {};
    default:
      break;
  }
}
