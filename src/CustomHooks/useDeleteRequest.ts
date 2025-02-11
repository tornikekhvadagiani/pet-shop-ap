import { toast } from "react-toastify";

const useDeleteRequest = ({
  endPoint,
  key,
  url,
  uuid,
  setIsLoaded,
  refreshData,
}: {
  endPoint: string;
  key: string;
  url: string;
  uuid: string;
  setIsLoaded?: (value: boolean) => void;
  refreshData: () => Promise<any>;
}) => {
  setIsLoaded && setIsLoaded(false);

  fetch(`${url}/${endPoint}/${uuid}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    })
    .then(() => refreshData())
    .catch((error) => {
      console.error("Error:", error);
      toast.error("Something Went Wrong!");
    })
    .finally(() => setIsLoaded && setIsLoaded(true));
};

export default useDeleteRequest;
