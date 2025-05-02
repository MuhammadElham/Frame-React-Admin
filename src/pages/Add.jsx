import React, { useState } from "react";
import { assets } from "../assets/assets";

const Add = () => {
  // State for Images
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  
  // State for Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Frame");
  const [subCategory, setSubCategory] = useState("Ring Tray");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  return (
    <form className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>
      {/*  */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type here" required />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Write content here" required />
      </div>
      {/*  */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select className="w-full px-3 py-2">
            <option value="Frame">Frame</option>
            <option value="Ring Trays">Ring Tray</option>
            <option value="Welcome Board">Welcome Board</option>
            <option value="Sweet Box">Sweet Box</option>
            <option value="Pen">Pen</option>
            <option value="Dupatta">Dupatta</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select className="w-full px-3 py-2">
            <option value="Frame">Frame</option>
            <option value="Ring Trays">Ring Tray</option>
            <option value="Welcome Board">Welcome Board</option>
            <option value="Sweet Box">Sweet Box</option>
            <option value="Pen">Pen</option>
            <option value="Dupatta">Dupatta</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input className="w-full px-3 py-2 sm:w-[120px]" type="number" placeholder="25" />
        </div>
      </div>
      {/*  */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">12" x 24"</p>
          </div>
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">11" x 17" (mini)</p>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex gap-2 mt-2">
        <input type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to BestSeller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white rounded-md border border-black text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300">
        ADD
      </button>
    </form>
  );
};

export default Add;
