import React, {useState} from "react";

import Header from "./Header";
import FormPattern from "./FormPattern";

//переименовать компонент
function Login ({
  onLogin,
  onStart
  })
  {
  const [logState, setLogState] = useState({
    email: '',
    password: ''
  })

  React.useEffect(() => {
    onStart()
  },[])


  function handleChange(evt) {
    const {name, value} = evt.target
    setLogState({...logState, [name]: value})
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onLogin(logState.email, logState.password)
  }

  return (
    <>
      <Header
        headerButtonText={'Регистрация'}
        userEmail={''}
        headerLink={'/register'}
      />
      <FormPattern
        formName={'логин'}
        title={'Вход'}
        buttonText={'Войти'}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        name={logState.email}
        password={logState.password}
      />
    </>
  )
}

export default Login
