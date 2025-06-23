import { useEffect, useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdSaveAs } from "react-icons/md";
import InputProfile from "../components/form/inputprofile";
import Container from "../components/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCard from "../hooks/useCard";

interface FormAddPlatProps {
  update?: boolean;
  Data?: any;
  onCloseModalUpdate?: Function;
}

const FormAddPlat: React.FC<FormAddPlatProps> = ({ update, Data, onCloseModalUpdate }) => {
  const { card, getDataCard } = useCard();
  const [selected, setSelected] = useState("");
  const [basicCompositions, setBasicCompositions] = useState<{ id: number; title: string }[]>([{ id: 1, title: "" }]);
  const [basicTaille, setBasicTaille] = useState<{ taille: string[]; price: number[] }>({
    taille: [""],
    price: [0],
  });

  const {
    register: registerSignup,
    handleSubmit: handleSubmitUpdate,
    formState: { errors: errorsSignup },
    setValue,
  } = useForm<FieldValues>();

  const InitialData = () => {
    setBasicCompositions([{ id: 1, title: "" }]);
    setBasicTaille({ taille: [""], price: [0] });
    setSelected("");
  };

  useEffect(() => {
    if (update && Data) {
      
      setBasicCompositions(Data.basicComposition);
      setBasicTaille(Data.detail);
      setSelected(Data.categoryParent);

      // Synchronisation avec react-hook-form
      setValue("title", Data.title);
      setValue("imageUrl", Data.imageUrl);
      setValue("categoryParent", Data.categoryParent);
    }
  }, [update, Data, setValue]);

  const handleAddComposition = (index: number) => {
    setBasicCompositions([...basicCompositions, { id: index, title: "" }]);
  };

  const handleRemoveComposition = (indexToRemove: number) => {
    setBasicCompositions(basicCompositions.filter((_, index) => index !== indexToRemove));
  };

  const handleCompositionChange = (index: number, newValue: string) => {
    const updated = [...basicCompositions];
    updated[index] = { id: index, title: newValue };
    setBasicCompositions(updated);
  };

  const handleTailleChange = (subIndex: number, field: 'taille' | 'price', value: string | number) => {
    setBasicTaille(prev => {
      const updated = { ...prev };
      if (field === 'taille') updated.taille[subIndex] = value as string;
      if (field === 'price') updated.price[subIndex] = value as number;
      return updated;
    });
  };

  const handleAddTaille = () => {
    setBasicTaille(prev => ({
      taille: [...prev.taille, ""],
      price: [...prev.price, 0],
    }));
  };

  const handleRemoveTaille = (subIndex: number) => {
    setBasicTaille(prev => ({
      taille: prev.taille.filter((_, idx) => idx !== subIndex),
      price: prev.price.filter((_, idx) => idx !== subIndex),
    }));
  };

  const listCategorie = card?.categories.map((el: any) => el.title) || [];

  const onSubmitUpdate: SubmitHandler<FieldValues> = async (formData) => {
    try {
      console.log({formData})
      const updatedFormData = {
        ...formData,
        basicComposition: basicCompositions,
        detail: basicTaille,
        categoryParent: selected,
      };
      console.log({updatedFormData})
      if (update) {
        
        await fetch(`http://localhost:8080/api/items/${Data.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedFormData),
        });
        onCloseModalUpdate?.();
      } else {
        await fetch(`http://localhost:8080/api/items/AddItems`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedFormData),
        });
      }

      toast.success("Plat enregistré avec succès !");
      InitialData();
      getDataCard();
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <Container>
      <div className="flex border-[1.2px] border-slate-200 bg-white shadow-md rounded-2xl w-full relative">
        <div className="w-full">
          <div className="flex justify-between">
            <div className="flex p-2 gap-1">
              <IoIosInformationCircleOutline size={25} />
              <p>{update ? "Modifier un plat" : "Ajouter un plat"}</p>
            </div>
            <div className="p-2">
              <MdSaveAs
                onClick={handleSubmitUpdate(onSubmitUpdate)}
                size={30}
                className="bg-white text-gray-600 rounded-md cursor-pointer"
              />
            </div>
          </div>

          <div className="p-2 grid gap-2">
            <InputProfile
              id="title"
              required
              register={registerSignup}
              errors={errorsSignup}
              type="text"
              placeholder=""
              label="Titre"
            />
            <InputProfile
              id="imageUrl"
              required
              register={registerSignup}
              errors={errorsSignup}
              type="text"
              placeholder=""
              label="Image URL"
            />

            <Box sx={{ minWidth: 120 }}>
              {basicTaille.taille.map((_, subIndex) => (
                <div className="flex" key={subIndex}>
                  <div className="w-full">
                    <InputProfile
                      id={`taille-${subIndex}`}
                      required
                     // register={registerSignup}
                      errors={errorsSignup}
                      type="text"
                      placeholder=""
                      label={`Taille ${subIndex + 1}`}
                      value={basicTaille.taille[subIndex]}
                      onChange={(e) => handleTailleChange(subIndex, "taille", e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <InputProfile
                      id={`price-${subIndex}`}
                      required
                     // register={registerSignup}
                      errors={errorsSignup}
                      type="number"
                      placeholder=""
                      label={`Prix ${subIndex + 1}`}
                      value={basicTaille.price[subIndex]}
                      onChange={(e) => handleTailleChange(subIndex, "price", parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="grid grid-rows-2 items-center">
                    {subIndex === basicTaille.taille.length - 1 && (
                      <>
                        {basicTaille.taille.length > 1 && (
                          <div onClick={() => handleRemoveTaille(subIndex)}>
                            <CiSquareMinus size={30} />
                          </div>
                        )}
                        <div onClick={handleAddTaille}>
                          <CiSquarePlus size={30} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </Box>

            {basicCompositions.map((composition, index) => (
              <div key={index} className="flex">
                <div className="w-full">
                  <InputProfile
                    id={`comp-${index}`}
                    required
                   // register={registerSignup}
                    errors={errorsSignup}
                    type="text"
                    placeholder=""
                    label={`Composition ${index + 1}`}
                    value={composition.title}
                    onChange={(e) => handleCompositionChange(index, e.target.value)}
                  />
                </div>
                <div className="grid grid-rows-2 items-center">
                  {index === basicCompositions.length - 1 && (
                    <>
                      {index > 0 && (
                        <div onClick={() => handleRemoveComposition(index)}>
                          <CiSquareMinus size={30} />
                        </div>
                      )}
                      <div onClick={() => handleAddComposition(index)}>
                        <CiSquarePlus size={30} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth error={!!errorsSignup.categoryParent}>
                <InputLabel variant="standard" htmlFor="category-parent-native">
                  Catégorie
                </InputLabel>
                <NativeSelect
                  id="categoryParent"
                  value={selected}
                  {...registerSignup("categoryParent", { required: true })}
                  onChange={(e) => {
                    setSelected(e.target.value);
                    setValue("categoryParent", e.target.value);
                  }}
                >
                  <option value=""></option>
                  {listCategorie.map((el: any, index: any) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))}
                </NativeSelect>
                {errorsSignup.categoryParent && (
                  <p className="text-red-500 text-sm">Veuillez sélectionner une catégorie</p>
                )}
              </FormControl>
            </Box>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default FormAddPlat;
