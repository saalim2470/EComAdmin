import { useState } from "react";
import ComponentCard from "../common/ComponentCard.tsx";
import Label from "../form/Label.tsx";
import Input from "../form/input/InputField.tsx";
import {
  BoxIcon,
  CloseIcon,
  EyeCloseIcon,
  EyeIcon,
  PlusIcon,
  TimeIcon,
} from "../../icons/index.ts";
import TextArea from "../form/input/TextArea.tsx";
import Switch from "../form/switch/Switch.tsx";
import FileInput from "../form/input/FileInput.tsx";
import Button from "../ui/button/Button.tsx";
import axios from "axios";
import FullPageLoader from "../common/FullPageLoader.jsx";
import Select from "../form/Select.tsx";
import BubbleChep from "../common/BubbleChep.jsx";
import { BeakerIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function ProductInputs() {
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const unitOptions = [
    { value: "GM", label: "GM" },
    { value: "KG", label: "KG" },
    { value: "ML", label: "ML" },
    { value: "Ltr", label: "Ltr" },
    { value: "Pic", label: "Pic" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [productInputs, setproductInputs] = useState({
    name: "",
    description: "",
    isActive: true,
    image: "",
    tags: [],
    tagsInput: "",
    brand: "",
    categoryId:"",
    variants: [
      {
        unit: "",
        unitInput: unitOptions[0].value,
        price: 0,
        discountPrice: 0,
        stock: 0,
        isAvailable: true,
      },
    ],
  });
  const [categoryData, setCategoryData] = useState([]);
  const addTags = () => {
    if (productInputs.tagsInput.trim() === "") return;
    setproductInputs((prev) => ({
      ...prev,
      tags: [...prev.tags, productInputs.tagsInput],
      tagsInput: "",
    }));
  };
  const removeTag = (index) => {
    const tags = [...productInputs.tags];
    const newTags = tags.filter((_, index1) => index1 !== index);
    setproductInputs((prev) => {
      return { ...prev, tags: newTags };
    });
  };
  const removeVariants = (index) => {
    const variants = [...productInputs.variants];
    const newVariants = variants.filter((_, index1) => index1 !== index);
    setproductInputs((prev) => {
      return { ...prev, variants: newVariants };
    });
  };
  const addVariants = () => {
    setproductInputs((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          unit: "",
          unitInput: unitOptions[0].value,
          price: 0,
          discountPrice: 0,
          stock: 0,
          isAvailable: true,
        },
      ],
    }));
  };
  const setInputData = (fieldName, value) => {
    setproductInputs({
      ...productInputs,
      [fieldName]: value,
    });
  };
  const setvarients = (index, fieldName, value) => {
    const updatedVariants = [...productInputs.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [fieldName]: value,
    };
    setproductInputs((prev) => ({
      ...prev,
      variants: updatedVariants,
    }));
  };
  const handleSelectChange = (selectedOption, index) => {
    setvarients(index, "unitInput", selectedOption);
  };
  const handleCategoryChange = (selectedOption) => {
    setInputData("categoryId", selectedOption);
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setInputData("image", file);
    }
  };
  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    Object.entries(productInputs).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // for (let [key, value] of formData.entries()) {
    //     console.log(`${key}:`, value);
    // }
    const token = localStorage.getItem("token");

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/category/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        setproductInputs({
          name: "",
          description: "",
          isActive: true,
          image: "",
        });
        alert("Category created successfuly");
      })
      .catch(function (error) {
        alert(error.response?.data?.msg || "some error occured");
        setIsLoading(false);
        console.log(error);
      });
  };
  const showTrashIcon = productInputs?.variants?.length > 1;
const getCategoryData = () => {
  const token = localStorage.getItem("token");
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/category/getAll?page=1&limit=30`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      setCategoryData(response.data?.data || []); // 👈 set the state here
      setIsLoading(false);
    })
    .catch(function (error) {
      alert(error.response?.data?.msg || "Some error occurred");
      setIsLoading(false);
      console.error(error);
    });
};

useEffect(() => {
  setIsLoading(true);
  getCategoryData(); // no need to assign return
}, []);
  

  return (
    <ComponentCard title="Create Product">
      {isLoading && <FullPageLoader />}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Product Name"
              value={productInputs.name}
              onChange={(e) => {
                setInputData("name", e.target.value);
              }}
            />
          </div>
          <div>
            <Label>Description</Label>
            <TextArea
              rows={6}
              // error
              value={productInputs.description}
              onChange={(value) => {
                setInputData("description", value);
              }}
            />
          </div>

          <Label htmlFor="name">Variants</Label>
          {/* varient card */}
          {productInputs?.variants?.map((variant, index) => {
            return (
              <div
                key={index}
                className="w-auto p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
              >
                {/* bin icon */}
                <div className="flex justify-end">
                  {showTrashIcon && (
                    <TrashIcon
                      className="size-6 text-red-400 hover:text-red-700 cursor-pointer"
                      onClick={() => removeVariants(index)}
                    />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-2">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        type="number"
                        min="0"
                        id="price"
                        name="price"
                        placeholder="Price"
                        value={variant?.price}
                        onChange={(e) => {
                          setvarients(index, "price", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="dicountPrice">Dicount Price</Label>
                      <Input
                        type="number"
                        min="0"
                        id="dicountPrice"
                        name="dicountP"
                        placeholder="Discount Price"
                        value={variant?.discountPrice}
                        onChange={(e) => {
                          setvarients(index, "discountPrice", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 xl:grid-cols-3 my-6">
                  <div className="col-span-2">
                    <Label htmlFor="unit">Unit</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        type="number"
                        min="0"
                        id="unit"
                        name="unit"
                        placeholder="Unit"
                        value={variant?.unit}
                        onChange={(e) => {
                          setvarients(index, "unit", e.target.value);
                        }}
                      />
                      <Select
                        options={unitOptions}
                        placeholder="Select Unit"
                        defaultValue={variant?.unitInput}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, index)
                        }
                        className="dark:bg-dark-900"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      type="number"
                      min="0"
                      id="stock"
                      name="stock"
                      placeholder="Stock"
                      value={variant?.stock}
                      onChange={(e) => {
                        setvarients(index, "stock", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Switch
                    label="IsAvailable"
                    defaultChecked={true}
                    onChange={() => {
                      setvarients(index, "isAvailable", !variant?.isAvailable);
                    }}
                    checked={variant?.isAvailable}
                  />
                </div>
              </div>
            );
          })}
          <Button
            size="sm"
            variant="outline"
            endIcon={<PlusIcon />}
            onClick={addVariants}
          >
            Add Variant
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              type="text"
              id="brand"
              name="brand"
              placeholder="Enter Brand"
              value={productInputs.brand}
              onChange={(e) => {
                setInputData("brand", e.target.value);
              }}
            />
          </div>
          <div>
            <Label>Select Category</Label>
            <Select
              valueKey="id"
              labelKey="name"
              options={categoryData}
              placeholder="Select Category"
              onChange={handleCategoryChange}
              className="dark:bg-dark-900"
            />
          </div>
          <div>
            <div className="flex items-center gap-5">
              <div className="flex-1">
                <Label htmlFor="name">Tags</Label>
                <Input
                  type="text"
                  id="tagsInput"
                  name="tagsInput"
                  placeholder="Enter Tags"
                  value={productInputs.tagsInput}
                  onChange={(e) => {
                    setInputData("tagsInput", e.target.value);
                  }}
                />
              </div>
              <div className="self-end">
                <Button
                  size="md"
                  className="hover:bg-blue"
                  variant="outline"
                  onClick={addTags}
                  // disabled={!productInputs.tagsInput}
                  startIcon={<PlusIcon />}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {productInputs?.tags.length > 0 &&
                productInputs.tags.map((value, index) => (
                  <BubbleChep
                    key={index}
                    value={value}
                    onClick={() => removeTag(index)}
                  />
                ))}
            </div>
          </div>
          <div>
            <Label>Upload file</Label>
            <FileInput onChange={handleFileChange} className="custom-class" />
          </div>
        </div>
      </div>
      <div className="w-full sm:self-center sm:w-2xs">
        <Button
          disabled={isLoading}
          size="md"
          variant="primary"
          className="w-full"
          //onClick={onSubmit}
        >
          Create
        </Button>
      </div>
    </ComponentCard>
  );
}
