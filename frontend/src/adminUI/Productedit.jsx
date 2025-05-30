import React, { useState } from 'react';

function Productedit() {
      const [errors, setErrors] = useState({});
      const [formData, setFormData] = useState({
        proName: '',
        otherName: '',
        price: '',
        proImage: null,
        type: '',
        days: '',
        description: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'file' ? files : value,
        });
        setErrors({ ...errors, [name]: '' });
      };
    
      const validateForm = () => {
        let isValid = true;
        const newErrors = {};
    
        if (!formData.proName.trim()) {
          newErrors.proName = 'Product Name is required';
          isValid = false;
        } else if (!/^[A-Za-z\s]+$/.test(formData.proName)) {
          newErrors.proName = 'Product Name must contain only alphabets';
          isValid = false;
        }
        if (!formData.otherName.trim()) {
          newErrors.otherName = 'Brand/Nickname is required';
          isValid = false;
        } else if (!/^[0-9A-Za-z\s]+$/.test(formData.otherName)) {
          newErrors.otherName = 'Brand/Nickname must not contain any symbols';
          isValid = false;
        }
        if (!formData.price.trim()) {
          newErrors.price = 'Product Price is required';
          isValid = false;
        } else if (!/^\d+$/.test(formData.price)) {
          newErrors.price = 'Price must be a non symbolic number';
          isValid = false;
        } else if (parseInt(formData.price, 10) <= 0) {
          newErrors.price = 'Price must be greater than 0';
          isValid = false;
        }
        if (!formData.proImage || formData.proImage.length === 0) {
          newErrors.proImage = 'Product Images are required';
          isValid = false;
        } else if (formData.proImage.length > 4) {
          newErrors.proImage = 'You can select a maximum of 4 images';
          isValid = false;
        } else {
          for (let file of formData.proImage) {
            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
              newErrors.proImage = 'Only JPG, JPEG, and PNG images are allowed';
              isValid = false;
              break;
            }
          }
        }
        if (!formData.type) {
          newErrors.type = 'Product Type is required';
          isValid = false;
        }
        if (!formData.days.trim()) {
          newErrors.days = 'No. of Days is required';
          isValid = false;
        } else if (!/^\d+$/.test(formData.days)) {
          newErrors.days = 'Days must be a non symbolic number';
          isValid = false;
        } else if (parseInt(formData.days, 10) <= 0) {
          newErrors.days = 'Days must be greater than 0';
          isValid = false;
        }
        if (!formData.description.trim()) {
          newErrors.description = 'Product Details are required';
          isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          console.log('Form data:', formData);
          // Here you would typically send the form data to your backend
        } else {
          console.log('Form has errors');
        }
      };

  return (
    <>
      <div>
      <form id="registrationForm" className="p-2" onSubmit={handleSubmit}>
              <div className="mb-4">
                <p className="flex text-center w-full items-center justify-center py-2">
                  Inset Your Product
                </p>
                <label htmlFor="proName" className="block text-sm font-medium">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="proName"
                  name="proName"
                  value={formData.proName}
                  onChange={handleInputChange}
                  placeholder="Enter your product name"
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                />
                {errors.proName && (
                  <p className="mt-1 text-sm text-red-500">{errors.proName}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="otherName" className="block text-sm font-medium">
                  Brand/Nickname <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="otherName"
                  name="otherName"
                  value={formData.otherName}
                  onChange={handleInputChange}
                  placeholder="Enter brand or any other name"
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                />
                {errors.otherName && (
                  <p className="mt-1 text-sm text-red-500">{errors.otherName}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium">
                  Product Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter product price"
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="proImage" className="block text-sm font-medium">
                  Product Images <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="proImage"
                  name="proImage"
                  accept="image/jpeg, image/jpg, image/png"
                  multiple
                  onChange={handleInputChange}
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                />
                {errors.proImage && (
                  <p className="mt-1 text-sm text-red-500">{errors.proImage}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium" htmlFor="type">
                  Product Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                >
                  <option value="">-Choose Categories-</option>
                  <option value="eletronics">Electronics</option>
                  <option value="communication">Communication</option>
                  <option value="transport">Transport</option>
                  <option value="antique">Antique</option>
                  <option value="softwares">Softwares</option>
                  <option value="artifacts">Artifacts</option>
                  <option value="clothing">Clothing</option>
                  <option value="sclupture">Sclupture</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-500">{errors.type}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="days" className="block text-sm font-medium">
                  No. Of Days <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="days"
                  name="days"
                  value={formData.days}
                  onChange={handleInputChange}
                  placeholder="Enter total days for bidding placement"
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                />
                {errors.days && (
                  <p className="mt-1 text-sm text-red-500">{errors.days}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium">
                  Product Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  placeholder="Enter item details"
                  className="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100 resize-none"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="px-2 py-1 border border-gray-200 shadow-md hover:bg-black hover:text-white cursor-pointer rounded"
                >
                  Submit
                </button>
              </div>
            </form>
      </div>
    </>
  )
}

export default Productedit
