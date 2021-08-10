import React, { useState, useReducer, useEffect, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/index';

const initialState = { value: '', isValid: null };
const emailReducer = (prevState, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.value, isValid: action.value.includes('@') };
	} else if (action.type === 'INPUT_BLUR') {
		return { value: prevState.value, isValid: prevState.value.includes('@') };
	}
	return initialState;
};

const passwordReducer = (prevState, action) => {
	if (action.type === 'INPUT_BLUR') {
		return { value: prevState.value, isValid: prevState.value.trim().length > 6 };
	} else if (action.type === 'USER_INPUT') {
		return { value: action.value, isValid: action.value.trim().length > 6 };
	}
	return initialState;
};
const Login = (props) => {
	const [emailState, dispatchEmail] = useReducer(emailReducer, initialState);

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, initialState);
	const [formIsValid, setFormIsValid] = useState(false);
	const authCtx = useContext(AuthContext);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	useEffect(() => {
		const timer = setTimeout(() => {
			console.log('check validaty');
			setFormIsValid(emailState.isValid && passwordState.isValid);
		}, 500);
		return () => {
			clearTimeout(timer);
		};
	}, [emailState.isValid, passwordState.isValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', value: event.target.value });
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', value: event.target.value });
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (formIsValid) {
			authCtx.onLogin(emailState.value, passwordState.value);
		} else if (!emailState.isValid) {
			emailInputRef.current.focus();
		} else {
			passwordInputRef.current.focus();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					id="email"
					label="Email"
					isValid={emailState.isValid}
					value={emailState.value}
					type="email"
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
					ref={emailInputRef}
				/>
				<Input
					id="password"
					label="Password"
					isValid={passwordState.isValid}
					value={passwordState.value}
					type="password"
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
					ref={passwordInputRef}
				/>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
