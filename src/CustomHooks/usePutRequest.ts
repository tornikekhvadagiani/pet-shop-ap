import { toast } from "react-toastify";

export interface IData {
  name?: string | null | undefined;
  description?: string | null | undefined;
  priceUSD?: string | null | undefined;
  stock?: string | null | undefined;
  isPopular?: boolean;

  animal?: {
    name: string | null | undefined;
    priceUSD: string | null | undefined;
    description: string | null | undefined;
    stock: string | null | undefined;
    isPopular: boolean;
  };
  category?: {
    name: string | null | undefined;
    description: string | null | undefined;
  };
}

interface IPostReq {
  url: string;
  key: string;
  endPoint: string;
  uuid: string;
  data: IData;
  navigate: (path: string) => void;
}

const usePutRequest = async ({
  url,
  key,
  endPoint,
  uuid,
  data,
  navigate,
}: IPostReq) => {
  try {
    const response = await fetch(`${url}/${endPoint}/${uuid}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    await response.json();
    console.log(endPoint);

    toast.success(
      !endPoint.includes("_")
        ? `${endPoint[0].toUpperCase()}${endPoint.slice(
            1
          )} Successfully Edited!`
        : endPoint
            .split("_")
            .map((e) => e[0].toUpperCase() + e.slice(1))
            .join(" ") + " Successfully Edited!"
    );

    navigate("/");
  } catch (error) {
    console.error("POST Request Error:", error);
    toast.error("Something Went Wrong!");
  }
};

export default usePutRequest;
