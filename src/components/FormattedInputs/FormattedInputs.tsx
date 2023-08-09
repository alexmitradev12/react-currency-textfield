import * as React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import Box from '@mui/material/Box';
import { Paper, TextField } from '@mui/material';
import "./FormattedInputs.css";

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
	function NumericFormatCustom(props, ref) {
		const { onChange, ...other } = props;

		return (
			<NumericFormat
				{...other}
				getInputRef={ref}
				onValueChange={(values) => {
					onChange({
						target: {
							name: props.name,
							value: values.value,
						},
					});
				}}
				thousandSeparator
				valueIsNumericString
				prefix="₽ "
				decimalScale={2}
				fixedDecimalScale
			/>
		);
	},
);

interface State {
	numberformat: string;
}

export default function FormattedInputs() {
	const [values, setValues] = React.useState<State>({ numberformat: '', });

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<Paper className='paper'>
			<Box sx={{ '& > :not(style)': { m: 1, }, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
				<TextField
					label="Введите сумму, руб"
					value={values.numberformat}
					onChange={handleChange}
					name="numberformat"
					id="standard"
					InputProps={{
						inputComponent: NumericFormatCustom as any,
					}}
					variant="standard"
				/>
				<TextField
					label="Введите сумму, руб"
					value={values.numberformat}
					onChange={handleChange}
					name="numberformat"
					id="outlined"
					InputProps={{
						inputComponent: NumericFormatCustom as any,
					}}
					variant="outlined"
				/>
				<TextField
					label="Введите сумму, руб"
					value={values.numberformat}
					onChange={handleChange}
					name="numberformat"
					id="filled"
					InputProps={{
						inputComponent: NumericFormatCustom as any,
					}}
					variant="filled"
				/>
			</Box>
		</Paper>
	);
}