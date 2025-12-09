import {
	IDENTIFICATION_TYPE_CODE_CC,
	IDENTIFICATION_TYPE_CODE_TI,
	IDENTIFICATION_TYPE_CODE_CE,
	IDENTIFICATION_TYPE_CODE_NI,
	IDENTIFICATION_TYPE_CODE_OE,
	IDENTIFICATION_TYPE_CODE_PA,
	IDENTIFICATION_TYPE_CODE_PT,
} from "@/constants/Globals";

export const TRANS = {
  title: {
    id: "LoginForm.HeadingForm.Title",
    defaultMessage: "Iniciar Sesión",
    description: "",
  },
  label_dni_type: {
    id: "LoginForm.LabelForm.DocumentType",
    defaultMessage: "Tipo documento:",
    description: "",
  },
  label_dni: {
    id: "LoginForm.LabelForm.Dni",
    defaultMessage: "Número documento:",
    description: "",
  },
  label_password: {
    id: "LoginForm.LabelForm.Password",
    defaultMessage: "Contraseña:",
    description: "",
  },
  info_password: {
    id: "LoginForm.LabelForm.InfoPassword",
    defaultMessage: "La contraseña debe tener un mínimo de 8 y un máximo de 10 caracteres, \n 1 carácter mayúscula, 1 carácter especial +-*/$\[]*¨´{} menos #.",
    description: "",
  },
  display_the_password: {
    id: "LoginForm.LabelForm.DisplayPassword",
    defaultMessage: "Mostrar contraseña",
    description: "",
  },
  hide_the_password: {
    id: "LoginForm.LabelForm.HideThePassword",
    defaultMessage: "Ocultar contraseña",
    description: "",
  },
  cancel: {
    id: "LoginForm.Button.Cancel",
    defaultMessage: "Cancelar",
    description: "",
  },
  login: {
    id: "LoginForm.Button.Login",
    defaultMessage: "Ingresar",
    description: "",
  },
  login_microsoft: {
    id: "LoginForm.Button.LoginMicrosoft",
    defaultMessage: "Ingresa con tu cuenta Microsoft",
    description: "",
  },
  forget_password: {
    id: "LoginForm.LabelForm.ForgetPassword",
    defaultMessage: "Olvidé mi contraseña",
    description: "",
  },
  title_recovery_password: {
    id: "LoginForm.LabelForm.RecoveryPassword",
    defaultMessage: "Recuperar Contraseña",
    description: "",
  },
  option_cc: {
    id: "LoginForm.MenuItem.CC",
    defaultMessage: "Cédula de ciudadanía",
    description: "",
  },
  option_ti: {
    id: "LoginForm.MenuItem.TI",
    defaultMessage: "Tarjeta de identidad",
    description: "",
  },
  option_ce: {
    id: "LoginForm.MenuItem.CE",
    defaultMessage: "Cédula de extranjería",
    description: "",
  },
  option_ni: {
    id: "LoginForm.MenuItem.NI",
    defaultMessage: "Identificación tributaria",
    description: "",
  },
  option_oe: {
    id: "LoginForm.MenuItem.OE",
    defaultMessage: "Operaciones externas",
    description: "",
  },
  option_pt: {
    id: "LoginForm.MenuItem.PT",
    defaultMessage: "Permiso de trabajo",
    description: "",
  },
  option_pa: {
    id: "LoginForm.MenuItem.PA",
    defaultMessage: "Pasaporte",
    description: "",
  },
}

export const IDENTIFICATION_TYPES = (texts: Record<string, string>) => [
  { label: texts.option_cc, value: IDENTIFICATION_TYPE_CODE_CC },
  { label: texts.option_ti, value: IDENTIFICATION_TYPE_CODE_TI },
  { label: texts.option_ce, value: IDENTIFICATION_TYPE_CODE_CE },
  { label: texts.option_ni, value: IDENTIFICATION_TYPE_CODE_NI },
  { label: texts.option_oe, value: IDENTIFICATION_TYPE_CODE_OE },
  { label: texts.option_pa, value: IDENTIFICATION_TYPE_CODE_PA },
  { label: texts.option_pt, value: IDENTIFICATION_TYPE_CODE_PT },
]