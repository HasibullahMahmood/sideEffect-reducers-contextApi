import React, { useState, useReducer, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

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
		props.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
