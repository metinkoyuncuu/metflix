import axios from "axios";
import { BASE_API_URL } from "../../environment/environment";
import axiosInstance from "../interceptors/axios-interceptor";
import { UserForLoginDto, UserForRegisterDto } from "../models/UserResponses";
import { VerifyEmailAuthenticatorModel } from "../models/EmailModels";
import toastr from 'toastr'

class AuthService {
	Register(model: UserForRegisterDto) {
		return axios.post(BASE_API_URL + "Auth/Register", model);
	}
	async Login(model: UserForLoginDto,locationlink:string) {
		return await axios.post(BASE_API_URL + "Auth/Login", model).then((r) => {
			toastr.success("Giriş işlemi Başarılı Tebrikler ... ");
			document.cookie = `token=${r.data.accessToken.token};`;
			setTimeout(() => {
				window.location.href = "/" + locationlink; 
			}, 500);
		}).catch((e) => {
			toastr.error("Bir hata oluştu lütfen tekrar deneyin");
		});
	}
	VerifyEmailAuthenticator(model: VerifyEmailAuthenticatorModel) {
		return axiosInstance.get("Auth/VerifyEmailAuthenticator?ActivationKey=" + model.activationKey);
	}
}

export default new AuthService();