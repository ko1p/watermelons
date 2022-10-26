import React, { useState } from 'react';
import './SignupForm.scss';
import { Form, Typography, Select, Modal } from 'antd';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../../../shared/ui/InputMelon/InputMelon';
import InputPasswordMelon from '../../../../shared/ui/InputPasswordMelon/InputPasswordMelon';
import SelectMelon from '../../../../shared/ui/SelectMelon/SelectMelon';
import CheckboxMelon from '../../../../shared/ui/CheckboxMelon/CheckboxMelon';
import authApi from '../../../../shared/api/auth';
import { logout } from '../../../../entities/user/client/model/auth';
import { logout as sellerLogout } from '../../../../entities/user/seller/model/auth';

import { ISignupFormData, Roles } from '../lib/types';

const { Title } = Typography;
const { Option } = Select;

const SignupForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] =
    useState<boolean>(false);
  const validateMessages = {
    required: 'Поле ${label} обязательно',
    types: {
      email: '${label} должен быть валидным',
      password: '${label} должен быть правильным',
    },
  };
  const className = classNames('signup-form');

  const onFinish = (values: ISignupFormData) => {
    setIsSubmitButtonLoading(true);
    authApi
      .signup(values.email, values.password, values.role)
      .then((res) => {
        Modal.info({
          title: 'Вы успешно зарегистрировались',
          // eslint-disable-next-line prettier/prettier
          content: `Ссылка подтверждения оправлена на почту ${res.message.split(' ').pop()}`,
          onOk: () => navigate('/signin'),
          okText: 'Войти',
        });
      })
      .catch((err) => {
        dispatch(logout());
        dispatch(sellerLogout());
        Modal.error({
          title: 'Упс! Кажется что-то пошло не так',
          content: err.message,
        });
      })
      .finally(() => {
        setIsSubmitButtonLoading(false);
      });
  };

  return (
    <Form
      onFinish={onFinish}
      validateMessages={validateMessages}
      className={className}
    >
      <Title level={3}>Регистрация</Title>
      <Form.Item
        name={['email']}
        label="E-mail"
        rules={[{ required: true, type: 'email' }]}
        className="signup-form__form-item"
      >
        <InputMelon type="email" placeholder="Введите ваш e-mail" />
      </Form.Item>
      <Form.Item
        name={['password']}
        label="Пароль"
        rules={[
          {
            pattern: /^[a-zA-Z0-9]*$/,
            message: 'Пароль может содержать только латинские буквы и цифры',
          },
          {
            required: true,
            type: 'string',
            min: 8,
            max: 30,
          },
        ]}
        className="signup-form__form-item"
      >
        <InputPasswordMelon type="password" minLength={8} maxLength={30} />
      </Form.Item>
      <Form.Item
        className="signup-form__form-item"
        name="confirm"
        label="Подтвердите пароль"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Пожалуйста, подтвердите пароль',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <InputPasswordMelon type="password" />
      </Form.Item>
      <Form.Item
        label="Роль"
        name={['role']}
        rules={[{ required: true }]}
        className="signup-form__form-item"
      >
        <SelectMelon>
          <Option value={Roles.SELLER}>Продавец</Option>
          <Option value={Roles.CLIENT}>Покупатель</Option>
        </SelectMelon>
      </Form.Item>
      <Form.Item
        name={['ok']}
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('Вы должны принять соглашение')),
          },
        ]}
        valuePropName="checked"
        className="signup-form__form-item"
      >
        <CheckboxMelon>
          Соглашаюсь с{' '}
          <Link className="signup-form__link-rules" to="/welcome">
            правилами сообщества
          </Link>
        </CheckboxMelon>
      </Form.Item>
      <Form.Item className="signup-form__form-item signup-form__submit-button">
        <ButtonMelon
          size="large"
          type="primary"
          htmlType="submit"
          loading={isSubmitButtonLoading}
        >
          Зарегистрироваться
        </ButtonMelon>
      </Form.Item>
      <p className="signup-form__signin-paragraph">
        Уже зарегистрированы?{' '}
        <Link to="/signin" className="signup-form__signin-link">
          Войти
        </Link>
      </p>
    </Form>
  );
};

export default SignupForm;
