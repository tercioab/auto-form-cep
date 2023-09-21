import axios from "axios";
import { useState } from "react";

export default function UseGetCepData() {
	const [cepExist, GetCepExist] = useState(false);
	async function getCepData(cep: string, setValue: Function) {
		try {
			const response = await axios.get(`https://brasilaberto.com/api/v1/zipcode/${cep}`);
			const { result } = response.data;
			setValue("logradouro", result.street);
			setValue("complemento", result.complement);
			setValue("bairro", result.district);
			setValue("localidade", result.state);
            setValue("cidade", result.city);
            GetCepExist(true)
        } catch (err) {
            GetCepExist(false)
			console.error("error ao buscar cep:", cep);
			return err;
		}
	}
	return {
		cepExist,
		getCepData,
	};
}
