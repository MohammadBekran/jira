import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

import client from "@/lib/rpc";
import { toast } from "@/lib/utils";

type TLoginResponseType = InferResponseType<
  (typeof client.api.auth.login)["$post"]
>;
type TLoginRequestType = InferRequestType<
  (typeof client.api.auth.login)["$post"]
>;

type TRegisterResponseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>;
type TRegisterRequestType = InferRequestType<
  (typeof client.api.auth.register)["$post"]
>;

type TLogoutResponseType = InferResponseType<
  (typeof client.api.auth.logout)["$post"]
>;
type TLogoutRequestType = InferRequestType<
  (typeof client.api.auth.logout)["$post"]
>;

const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<TLoginResponseType, Error, TLoginRequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login.$post({ json });

      if (!response.ok) throw new Error("Failed to log in");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logged in");

      router.refresh();
      queryClient.invalidateQueries({
        queryKey: ["current"],
      });
    },
    onError: () => toast.error("Failed to log in"),
  });

  return mutation;
};

const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TRegisterResponseType,
    Error,
    TRegisterRequestType
  >({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register.$post({ json });

      if (!response.ok) throw new Error("Failed to register");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Registered");

      router.refresh();
      queryClient.invalidateQueries({
        queryKey: ["current"],
      });
    },
    onError: () => toast.error("Failed to register"),
  });

  return mutation;
};

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<TLogoutResponseType, Error, TLogoutRequestType>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();

      if (!response.ok) throw new Error("Failed to log out");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logged out");

      router.refresh();
      queryClient.invalidateQueries({
        queryKey: ["current"],
      });
    },
    onError: () => toast.error("Failed to log out"),
  });

  return mutation;
};

export { useLogin, useLogout, useRegister };
