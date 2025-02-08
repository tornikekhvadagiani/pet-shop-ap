// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addPetsAction, deletePetsAction } from "../../store/pets/pets.action";
// import { Pet } from "../../store/types";

// const MainPage = () => {
//   const [value, setValue] = useState<string>("");
//   const dispatch = useDispatch();
//   const { petsList } = useSelector((state: any) => state.petsList);
//   console.log(petsList);

//   const submit = (e: any) => {
//     e.preventDefault();
//     console.log(petsList);

//     dispatch(
//       addPetsAction({
//         id: 12,
//         name: value,
//         type: "asd",
//       })
//     );
//     setValue("");
//   };
//   const deleteA = () => {
//     dispatch(
//       deletePetsAction({
//         id: 12,
//         name: value,
//         type: "asd",
//       })
//     );
//   };
//   return (
//     <div>
//       <input
//         type="text"
//         value={value}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//           setValue(e.target.value)
//         }
//       />
//       <input type="submit" onClick={submit} />
//       {petsList?.map((e: Pet) => (
//         <h1 onClick={deleteA}>{e.name}</h1>
//       ))}
//     </div>
//   );
// };

// export default MainPage;
