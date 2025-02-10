import { toast } from "react-toastify";

interface IPostReq {
  url: string;
  key: string;
  endPoint: string;
  uuid: string;
  setIsLoaded: (value: boolean) => void;
}

const useDeleteRequest = async ({
  url,
  key,
  endPoint,
  uuid,
  setIsLoaded,
  refreshData,
}: IPostReq & { refreshData: () => Promise<void> }) => {
  setIsLoaded(false);
  try {
    const response = await fetch(`${url}/${endPoint}/${uuid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    await response.json();
    toast.success(
      !endPoint.includes("_")
        ? `${endPoint[0].toUpperCase()}${endPoint.slice(
            1
          )} Successfully Deleted!`
        : endPoint
            .split("_")
            .map((e) => e[0].toUpperCase() + e.slice(1))
            .join(" ") + " Successfully Deleted!"
    );
    await refreshData();
  } catch (error) {
    console.error("Delete Request Error:", error);
    toast.error("Something Went Wrong!");
  } finally {
    setIsLoaded(true);
  }
};

export default useDeleteRequest;
