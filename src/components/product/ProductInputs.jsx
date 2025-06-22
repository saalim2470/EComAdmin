import { useState } from "react"
import ComponentCard from "../common/ComponentCard.tsx"
import Label from "../form/Label.tsx"
import Input from "../form/input/InputField.tsx"
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../icons/index.ts"
import TextArea from "../form/input/TextArea.tsx"
import Switch from "../form/switch/Switch.tsx"
import FileInput from "../form/input/FileInput.tsx"
import Button from "../ui/button/Button.tsx"
import axios from "axios"
import FullPageLoader from "../common/FullPageLoader.jsx"
import Select from "../form/Select.tsx"

export default function ProductInputs() {
const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
    
    const [isLoading, setIsLoading] = useState(false)
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
        isActive: true,
        image: ''
    })

    const setInputData = (fieldName, value) => {
        setCategoryData({
            ...categoryData,
            [fieldName]: value
        })
    }
    const handleSelectChange = (selectedOption) =>{}
    const handleSwitchChange = (checked) => {
        setInputData('isActive', checked)
    };
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setInputData('image', file)
        }
    };
    const onSubmit = () => {
        setIsLoading(true)
        const formData = new FormData();
        Object.entries(categoryData).forEach(([key, value]) => {
            formData.append(key, value)
        })
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }
        const token = localStorage.getItem('token');

        axios.post(`${import.meta.env.VITE_API_URL}/api/category/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                 'Authorization': `Bearer ${token}`
            },
        })
            .then(function (response) {
                console.log(response);
                setIsLoading(false)
                setCategoryData({
                    name:'',
                    description:'',
                    isActive:true,
                    image:''
                })
                alert('Category created successfuly')

            })
            .catch(function (error) {
                alert(error.response?.data?.msg || 'some error occured')
                setIsLoading(false)
                console.log(error);
            });
    }

    return (
        <ComponentCard title="Create Product">
            {isLoading&&<FullPageLoader/>}
            <div className="space-y-6">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input type="text"
                        id="name"
                        name="name"
                        placeholder="Enter Product Name"
                        value={categoryData.name}
                        onChange={(e) => { setInputData('name', e.target.value) }}
                    />
                </div>
                <div>
                    <Label>Description</Label>
                    <TextArea
                        rows={6}
                        // error
                        value={categoryData.description}
                        onChange={(value) => { setInputData('description', value) }}
                     hint="Enter Product Description"
                    />
                </div>
                <div>
                  <Label>Select Category</Label>
                  <Select
                    options={options}
                    placeholder="Select Category"
                    onChange={handleSelectChange}
                    className="dark:bg-dark-900"
                  />
                </div>
                <div>
                    <Switch
                        label="IsActive"
                        defaultChecked={true}
                        onChange={handleSwitchChange}
                    />
                </div>
                <div>
                    <Label>Upload file</Label>
                    <FileInput onChange={handleFileChange} className="custom-class" />
                </div>
                <div className="flex items-center gap-5">
                    <Button
                        disabled={isLoading}
                        size="md"
                        variant="primary"
                        //onClick={onSubmit}
                    >
                        Create
                    </Button>
                </div>
            </div>
        </ComponentCard>
    )
}
