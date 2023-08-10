import * as React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import Box from '@mui/material/Box';
import { Paper, TextField, Button } from '@mui/material';
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
				thousandSeparator=" "
				valueIsNumericString
				prefix=" "
				decimalScale={6}
				fixedDecimalScale
			/>
		);
	},
);

// interface State {
// 	numberformat: string;
// }

//------------------------------------------------------------------------------------
export default function FormattedInputs() {
	const [values, setValues] = React.useState<string>();
	const [valueWithoutMask, setValueWithoutMask] = React.useState<string>();

	const handleChangeWithMask = (e: { target: { value: string }; }) => {
		setValues(e.target.value);
	};

	const handleChangeWithoutMask = (e: { target: { value: string }; }) => {
		setValueWithoutMask(e.target.value);
	}

	const handleSetData = () => {
		setValues(valueWithoutMask);
		console.log(values);
	}

	return (
		<Paper className='paper'>
			<Box sx={{ '& > :not(style)': { m: 1, }, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
				<TextField
					label="Сумма с маской"
					value={values}
					onChange={handleChangeWithMask}
					name="numberformat"
					id="outlined"
					InputProps={{
						inputComponent: NumericFormatCustom as any,
					}}
					variant="outlined"
				/>
				<TextField label="Сумма без маски" onChange={handleChangeWithoutMask}></TextField>
				<Button variant="contained" onClick={handleSetData}>Внести данные</Button>
			</Box>
		</Paper>
	);
}