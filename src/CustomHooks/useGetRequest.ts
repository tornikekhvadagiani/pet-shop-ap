// import { toast } from "react-toastify";
// import { IAnimalsData, ICategoryData } from "../globalTypes";

import { toast } from "react-toastify";

// interface IGetReq {
//   url: string;
//   key: string;
//   setData: (data: ICategoryData[] | IAnimalsData[]) => void;
//   setIsLoaded?: (value: boolean) => void;
// }

// const useGetRequest = ({ url, key, setData, setIsLoaded }: IGetReq) => {
//   setIsLoaded && setIsLoaded(false);
//   return fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${key}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       setData(data.items);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       toast.error("Something Went Wrong!");

//       throw error;
//     })
//     .finally(() => setIsLoaded && setIsLoaded(true));
// };

// export default useGetRequest;

const useGetRequest = () => {
  const getRequest = async (url: string, key: string) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.items;
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Something Went Wrong!");
      throw error;
    }
  };

  return { getRequest };
};

export default useGetRequest;
