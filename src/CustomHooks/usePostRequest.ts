import { toast } from "react-toastify";

interface IData {
  name: string | null | undefined;
  priceUSD?: string | null | undefined;
  description: string | null | undefined;
  stock?: string | null | undefined;
  isPopular?: boolean;
}

interface IPostReq {
  url: string;
  key: string;
  endPoint: string;
  data: IData;
  navigate: (path: string) => void;
}

const usePostRequest = async ({
  url,
  key,
  endPoint,
  data,
  navigate,
}: IPostReq) => {
  try {
    const response = await fetch(`${url}/${endPoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([data]),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    await response.json();

    toast.success(
      `${endPoint[0].toUpperCase()}${endPoint.slice(1)} Successfully Created!`
    );

    navigate("/");
  } catch (error) {
    console.error("POST Request Error:", error);
    toast.error("Something Went Wrong!");
  }
};

export default usePostRequest;
