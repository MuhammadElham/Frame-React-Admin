import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  // State for Images
  const [images, setImages] = useState([null, null, null, null]);

  // State for Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Frame");
  const [subCategory, setSubCategory] = useState("Ring Tray");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // State for Testimonial
  const [testimonial, setTestimonial] = useState({
    name: "",
    heading: "",
    text: "",
    rating: 0,
    mainImage: null,
    subImages: [null, null, null],
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Product data
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      // Testimonial data
      formData.append(
        "testimonials",
        JSON.stringify({
          name: testimonial.name,
          heading: testimonial.heading,
          text: testimonial.text,
          rating: testimonial.rating,
        })
      );

      // Images
      images.forEach((img, index) => img && formData.append(`image${index + 1}`, img));
      testimonial.mainImage && formData.append("testimonialMainImage", testimonial.mainImage);
      testimonial.subImages.forEach((img, index) => img && formData.append(`testimonialSubImage${index + 1}`, img));

      const formDataObject = Object.fromEntries(formData);
      console.log(formDataObject);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);

        // Reset all fields
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Frame");
        setSubCategory("Ring Tray");
        setBestseller(false);
        setSizes([]);
        setImages([null, null, null, null]);
        setTestimonial({
          name: "",
          heading: "",
          text: "",
          rating: 0,
          mainImage: null,
          subImages: [null, null, null],
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with status code != 2xx
        console.log("Backend error:", error.response.data);
        console.log("Status code:", error.response.status);
        toast.error("Server Error: " + (error.response.data.message || error.response.status));
      } else if (error.request) {
        // Request made but no response
        console.log("No response from server:", error.request);
        toast.error("No response from server");
      } else {
        // Something else
        console.log("Error:", error.message);
        toast.error(error.message);
      }
    }
  };

  const showSizeSelector = category === "Frame" || subCategory === "Frame";

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      {/* Images */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {images.map((img, index) => (
            <label key={index} htmlFor={`image${index}`}>
              <img className="w-20" src={img ? URL.createObjectURL(img) : assets.upload_area} alt="" />
              <input
                type="file"
                id={`image${index}`}
                hidden
                onChange={(e) => {
                  const newImages = [...images];
                  newImages[index] = e.target.files[0];
                  setImages(newImages);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name & Description */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          type="text"
          value={name}
          placeholder="Type here"
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          value={description}
          placeholder="Write content here"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          required
        />
      </div>

      {/* Category & Price */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2">
            {["Frame", "Ring Tray", "Welcome Board", "Sweet Box", "Pen", "Dupatta"].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Sub Category</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
            {["Frame", "Ring Tray", "Welcome Board", "Sweet Box", "Pen", "Dupatta"].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 sm:w-[120px]" placeholder="25" />
        </div>
      </div>

      {/* Sizes */}
      {showSizeSelector && (
        <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            {['12" x 24"', '11" x 17" (mini)'].map((size) => (
              <p
                key={size}
                onClick={() => setSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))}
                className={`${sizes.includes(size) ? "bg-[#d1a847] border border-[#917431] text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Bestseller */}
      <div className="flex gap-2 mt-2">
        <input type="checkbox" checked={bestseller} onChange={() => setBestseller((prev) => !prev)} id="bestseller" />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to BestSeller
        </label>
      </div>

      {/* Testimonial */}
      <div className="w-full mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-3">Add Testimonials</h3>
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setTestimonial((prev) => ({ ...prev, rating: star }))}
              className={`cursor-pointer text-xl ${testimonial.rating >= star ? "text-yellow-500" : "text-gray-300"}`}
            >
              ★
            </span>
          ))}
        </div>

        <div className="flex flex-col  ">
          <input
            type="text"
            value={testimonial.name}
            placeholder="Customer Name"
            onChange={(e) => setTestimonial((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full max-w-[500px] px-3 py-2 border rounded mb-3"
          />

          <input
            type="text"
            value={testimonial.heading}
            placeholder="Heading (Optional)"
            onChange={(e) => setTestimonial((prev) => ({ ...prev, heading: e.target.value }))}
            className="w-full max-w-[500px] px-3 py-2 border rounded mb-3"
          />
        </div>

        <div className="flex gap-2 mb-3">
          <label>
            <img
              src={testimonial.mainImage ? URL.createObjectURL(testimonial.mainImage) : assets.upload_area}
              className="w-24 h-24 object-cover border rounded cursor-pointer"
            />
            <input type="file" hidden onChange={(e) => setTestimonial((prev) => ({ ...prev, mainImage: e.target.files[0] }))} />
          </label>
          {testimonial.subImages.map((img, i) => (
            <label key={i}>
              <img src={img ? URL.createObjectURL(img) : assets.upload_area} className="w-20 h-20 object-cover border rounded cursor-pointer" />
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const newSub = [...testimonial.subImages];
                  newSub[i] = e.target.files[0];
                  setTestimonial((prev) => ({ ...prev, subImages: newSub }));
                }}
              />
            </label>
          ))}
        </div>

        <textarea
          value={testimonial.text}
          placeholder="Write customer feedback..."
          onChange={(e) => setTestimonial((prev) => ({ ...prev, text: e.target.value }))}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white rounded-md border border-black text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
