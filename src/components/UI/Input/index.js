import React, { useRef, useImperativeHandle } from 'react';
import classes from './style.module.css';

const Input = React.forwardRef((props, ref) => {
	const inputRef = useRef();

	const focus = () => {
		inputRef.current.focus();
	};
	useImperativeHandle(ref, () => {
		return { focus };
	});
	return (
		<div className={`${classes.control} ${props.isValid === false ? classes.invalid : ''}`}>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				ref={inputRef}
				type={props.type}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlue}
			/>
		</div>
	);
});

export default Input;
