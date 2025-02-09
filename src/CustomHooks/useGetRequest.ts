import { toast } from "react-toastify";
import { IAnimalsData, ICategoryData } from "../globalTypes";

interface IGetReq {
  url: string;
  key: string;
  setData: (data: ICategoryData[] | IAnimalsData[]) => void;
  setIsLoaded?: (value: boolean) => void;
}

const useGetRequest = ({ url, key, setData, setIsLoaded }: IGetReq) => {
  setIsLoaded && setIsLoaded(false);
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setData(data.items);
    })
    .catch((error) => {
      console.error("Error:", error);
      toast.error("Something Went Wrong!");

      throw error;
    })
    .finally(() => setIsLoaded && setIsLoaded(true));
};

export default useGetRequest;
