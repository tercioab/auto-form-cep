import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
	cep: string;
	logradouro: string;
	complemento: "lado ímpar";
	bairro: string;
  localidade: string;
  cidade: string;
};

export default function App() {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  async function GetCepData() {
    const cep = watch('cep')
		axios.get(`https://brasilaberto.com/api/v1/zipcode/${cep}`).then(resp => {
			resp.data.result;
			setValue("logradouro", resp.data.result.street);
			setValue("complemento", resp.data.result.complement);
			setValue("bairro", resp.data.result.district);
      setValue("localidade", resp.data.result.state);
      setValue("cidade", resp.data.result.city);
		});
	}
	if (watch("cep")?.length === 8) {
		GetCepData();
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register("cep")} />
			<input {...register("logradouro")} />
			<input {...register("complemento")} />
			<input {...register("bairro")} />
      <input {...register("localidade")} />
      <input {...register("cidade")} />
			<input type='submit' />
		</form>
	);
}
