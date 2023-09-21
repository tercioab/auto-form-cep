import UseGetCepData from "@/hooks/GetCepData";
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	Stack
} from "@chakra-ui/react";
import { useEffect } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

type Inputs = {
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	cidade: string;
};

export default function App() {
	const { getCepData, cepExist } = UseGetCepData();
	const {
		control,
		handleSubmit,
		setValue,
		register,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>();
	const cep = useWatch({ control, name: "cep", defaultValue: "" });

	useEffect(() => {
		const cepLengths = 8;
		if (cep?.length === cepLengths) {
			getCepData(cep, setValue);
		}
	}, [cep, setValue, getCepData]);

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		if (!cepExist) {
			setError(
				"cep",
				{ type: "focus", message: "digite um cep valido" },
				{ shouldFocus: true },
			);
		} else {
			console.log(data);
		}
	};

	return (
		<Box w='full' display='flex' justifyItems='center' justifyContent='center'>
			<Stack as='form' direction='column' onSubmit={handleSubmit(onSubmit)}>
				<FormControl isInvalid={!!errors.cep}>
					<Input {...register("cep")} placeholder='cep' />
					<FormErrorMessage>{errors.cep && errors.cep.message}</FormErrorMessage>
				</FormControl>
				<Input {...register("logradouro")} placeholder='logradouro' />
				<Input {...register("complemento")} placeholder='complemento' />
				<Input {...register("bairro")} placeholder='bairro' />
				<Input {...register("localidade")} placeholder='localidade' />
				<Input {...register("cidade")} placeholder='cidade' />
				<Button isLoading={isSubmitting} type='submit'>
					ENVIAR
				</Button>
			</Stack>
		</Box>
	);
}
