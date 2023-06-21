import useValidation from '../../hooks/useValidation';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

function Login(props) {
  const { values, errors, handleChange } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(values);
  }
  return (
    <main>
      <AuthForm
        title={'Рады видеть!'}
        textBtn={'Войти'}
        link='/signup'
        textLink='Регистрация'
        subtitle='Еще не зарегистрированы?'
        onSubmit={handleSubmit}
      >
        <Input
          id='email'
          title='E-mail'
          name='email'
          type='email'
          required=''
          value={values.email || ''}
          onChange={handleChange}
          errors={errors.email || ''}
          placeholder='Введите e-mail'
        />
        <Input
          id='password'
          title='Пароль'
          name='password'
          type='password'
          required=''
          minLength={8}
          value={values.password || ''}
          onChange={handleChange}
          errors={errors.password || ''}
          placeholder='Введите пароль'
        />
      </AuthForm>
    </main>
  );
}

export default Login;
