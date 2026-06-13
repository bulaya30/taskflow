import axios from "axios";
import instance, { AxiosError } from "@/api/axiosInstance";
import type { Setting, SettingInputs } from "@/interfaces/setting";

const handleError = (
  error: unknown,
  fallbackMessage: string
): never => {
  if (axios.isAxiosError(error)) {
    throw AxiosError(error, fallbackMessage);
  }

  throw new Error("Unexpected error occurred");
};

export const SettingServices = {

  createSetting: async (setting : SettingInputs) => {
    try {
      const res = await instance.post(`users/settings`, setting);
      return res.data;
    } catch (error) {
      handleError(error, "Failed to fetch settings");
    }
  },

  getSettings: async () : Promise<Setting> => {
    const res = await instance.get(`users/settings`);
    return res.data ?? null ;
  },

  getSettingById: async (id: string) : Promise<Setting> => {
    const res = await instance.get(`users/settings/${id}`);
    return res.data as Setting;
  },
  
  updateSetting: async (id : string | number, data : Partial<Setting>) => {
    try {
      const res = await instance.put(`users/settings/${id}`, data);
      
      return res.data;
    } catch (error) {
      handleError(error, "Failed to fetch settings");
    }
  },
  
  deleteSetting: async (id : string | number) => {
    try {
      const res = await instance.delete(`/settings/${id}`);
        return res.data;
      } catch (error) {
        handleError(error, "Failed to fetch settings");
    }
  }
};