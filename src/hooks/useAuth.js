import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    //Lee un access token que regresa desde la información del servidor
    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
    //console.log(access_token); //Nos permite ver la información retornada
    if (access_token) {
      const token = access_token.access_token; //requerido para el acceso a la información
      Cookie.set('token', token, { expires: 5 });
      /*expires permite que después de un tiempo definido podamos eliminar
	    la información almacenada y pueda volver a logear*/
      //Se envía la información necesaria para que pueda definir el valor por defecto
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      //Vamos a llamar el recurso con el profile
      const { data: user } = await axios.get(endPoints.auth.profile);
      console.log(user);
      setUser(user);
    }
  };

  return {
    user,
    signIn,
    error,
    setError,
  };
}
