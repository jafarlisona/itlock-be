import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = process.env.PORT;
const key = process.env.KEY;

app.use(express.json());
app.use(cors());
const brandsSchema = new mongoose.Schema({
  brandName: String,
  title: String,
  image: String,
});
const brandsModel = mongoose.model("brands", brandsSchema);

app.get("/brands", async (req, res) => {
  try {
    const allBrands = await brandsModel.find({});
    res.status(200).json(allBrands);
  } catch (error) {
    res.send("Brands are not found!");
  }
});

app.get("/brands/:id", async (req, res) => {
  const { id } = req.params;
  const brand = await brandsModel.findById(id);
  res.send(brand);
});

app.post("/brands", async (req, res) => {
  try {
    const { brandName, title, image } = req.body;
    const newBrands = new brandsModel({ brandName, title, image });
    await newBrands.save();
    res.send("Brands is created!");
  } catch (error) {
    res.send("Brands is not created!");
  }
});

app.put("/brands/:id", async (req, res) => {
  const { id } = req.params;
  const { brandName, title, image } = req.body;
  const brands = await brandsModel.findByIdAndUpdate(id, {
    brandName,
    title,
    image,
  });
  res.send(brands);
});

app.delete("/brands/:id", async (req, res) => {
  const { id } = req.params;
  const brands = await brandsModel.findByIdAndDelete(id);
  res.send(brands);
});

mongoose
  .connect(key)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("Not Connected!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
