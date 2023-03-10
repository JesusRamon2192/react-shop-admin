import React, {useState, useContext, createContext} from 'react';
import Cookie from 'js-cookie'; //Nos ayuda asignar a nuestro navegador las cookies que esté recibiendo en el momento de la autenticación
import axios from 'axios'; //Para el manejo de las peticiones como GET, PUT, POST, DELETE

const AuthContext = createContext(); //Se crea un nuevo context gracias a la api de react
//Se crea la encapsulación de nuestra aplicación
export function ProviderAuth({children}){
	const auth = useProvideAuth();
	return <AuthContext.Provider value ={auth}>{children}</AuthContext.Provider>;
}
//Permite exponer cierta información que se estará requiriendo
export const useAuth = () => {
	return useContext(AuthContext);
};
//Captar la información del usuario
function useProvideAuth() {
	const [user, setUser] = useState(null);

	const signIn = async (email, password) => {
	setUser('login');
	};

	return{
		user,
		signIn,
	};
}