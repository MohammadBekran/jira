import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import client from "@/lib/rpc";

type TLoginResponseType = InferResponseType<
  (typeof client.api.auth.login)["$post"]
>;
type TLoginRequestType = InferRequestType<
  (typeof client.api.auth.login)["$post"]
>["json"];

type TRegisterResponseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>;
type TRegisterRequestType = InferRequestType<
  (typeof client.api.auth.register)["$post"]
>["json"];

type TLogoutResponseType = InferResponseType<
  (typeof client.api.auth.logout)["$post"]
>;
type TLogoutRequestType = InferRequestType<
  (typeof client.api.auth.logout)["$post"]
>;

const useLogin = () => {
  const mutation = useMutation<TLoginResponseType, Error, TLoginRequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.login.$post({ json });

      return await response.json();
    },
  });

  return mutation;
};

const useRegister = () => {
  const mutation = useMutation<
    TRegisterResponseType,
    Error,
    TRegisterRequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.auth.register.$post({ json });

      return await response.json();
    },
  });

  return mutation;
};

const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TLogoutResponseType, Error, TLogoutRequestType>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();

      return await response.json();
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["current"],
      }),
  });

  return mutation;
};

export { useLogin, useRegister, useLogout };
