interface IGetReq {
  url: string;
  key: string;
  setData: (data) => void;
}

const useGetRequest = ({ url, key, setData }: IGetReq) => {
  return fetch(url, {
    method: "GET", // Changed to GET request
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
      setData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export default useGetRequest;
