import React, { useState, useEffect, useRef } from 'react';
import user_img from '../pictures/user.jpg';
import { BASE_URL } from '../api/BaseUrrlForImage.js';
import API from '../api/API.js';
import toast from 'react-hot-toast'

function Editprofile({ ussid }) {
  const [profilePicSrc, setProfilePicSrc] = useState(user_img);
  const inputFileRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfilePicSrc(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    inputFileRef.current.click();
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.post("/userProfile", {
          userId: ussid,
        });
        if (response.data.length > 0) {
          setUser(response.data[0]);
          setFormData(response.data[0]);
        }

      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchProduct();
  }, [ussid]);

  const [formData, setFormData] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await API.post('/updateUser', formData);

      if (response.status === 200) {
        toast.success("Profile updated successfully", {position: "top-right"});
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.success("Profile updated failed!", {position: "top-right"});
    }
  };

  return (
    <>
      <div className="p-2">
        <div className="flex flex-col md:flex-row">
          <main className="flex-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md px-4 sm:px-6 py-2">
              <div className="flex flex-wrap justify-around w-full">
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Management</h3>
                  <div className="flex flex-col items-center px-4">
                    <div className="w-36 h-42 rounded overflow-hidden mb-4">
                      <img src={user.user_profile ? `${BASE_URL}/uploads/${user.user_profile}` : profilePicSrc} alt="User Avatar" className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full flex justify-center items-center h-12 rounded border border-gray-200 bg-gray-100">
                      <input
                        name="user_profile"
                        type="file"
                        accept="image/*"
                        ref={inputFileRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <label
                        htmlFor="image"
                        className="text-gray-600 border border-gray-200 px-16 py-1 bg-white outline-none cursor-pointer text-[13px] font-semibold rounded-md"
                      >
                        Upload Photo
                      </label>
                    </div>

                  </div>
                  <div className="px-4 py-2">
                    <div>
                      <label className="block text-sm font-medium text-[#1b1b1ee6] my-2">User Login</label>
                      <input
                        name="user_email"
                        type="email"
                        placeholder="Your login email"
                        value={formData.user_email || ""}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 placeholder:text-[14px] text-[14px] outline-none px-2 py-1 rounded border border-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1b1ee6] my-2">User Password</label>
                      <input
                        name="user_password"
                        type="password"
                        placeholder="Your password.."
                        value={formData.user_password || ""}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 placeholder:text-[14px] text-[14px] outline-none px-2 py-1 rounded border border-gray-50"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-3/4 space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">Username</label>
                        <input
                          name="user_name"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                          value={formData.user_name || ""}
                          onChange={handleInputChange} />
                        <input type="hidden" name="user_id" value={ussid}
                          onChange={handleInputChange} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">State</label>
                        <input
                          name="user_state"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                          value={formData.user_state || ""}
                          onChange={handleInputChange} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">District</label>
                        <input
                          name="user_district"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                          value={formData.user_district || ""}
                          onChange={handleInputChange} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">Street/Village</label>
                        <input
                          name="user_street"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                          value={formData.user_street || ""}
                          onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">Contact</label>
                        <input
                          name="user_phone"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                          value={formData.user_phone || ""}
                          onChange={handleInputChange} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">Postal</label>
                        <input
                          name="social1"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">WhatsApp</label>
                        <input
                          name="social2"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1b1b1ee6]">Website</label>
                        <input
                          name="social3"
                          type="text"
                          className="w-full mt-1 border-gray-300 outline-none p-2 rounded text-[14px] border border-gray-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">About the User</h3>
                <textarea
                  name="bio"
                  className="w-full mt-1 border-gray-300 text-gray-700 text-[14px] outline-none p-2 rounded border border-gray-50 resize-none"
                  rows="4"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </textarea>
              </div>
              <div className="my-2 flex justify-end items-center">
                <button type="submit" className="border border-gray-200 px-4 py-2 bg-black text-white outline-none cursor-pointer text-[13px] font-semibold rounded-md">
                  Update
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}

export default Editprofile;