import tableOperations from "../db/tableOperations.js";
import CreateTables from "../db/initTables.js";
import fetchAndInsert from "../db/loadDataURLLiik.js";
import fetchAndInsertTootja from "../db/loadDataURLTootja.js";
import fetchAndInsertTooted from "../db/loadDataURLTooted.js";

export const resetDB = async (req, res) => {
  try {
    await tableOperations.dropTableTOOTED();
    await tableOperations.dropTableLIIK();
    await tableOperations.dropTableTOOTJA();
    await CreateTables.createTableTOOTJA();
    await CreateTables.createTableLIIK();
    await CreateTables.createTableTOOTED();
    await fetchAndInsert();
    await fetchAndInsertTootja();
    await fetchAndInsertTooted();

    res.status(200).json({ message: "Databaas edukalt resetitud." });
  } catch (error) {
    console.error("Error in resetDB controller:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};
export const sortUp = async (req, res) => {
  try {
    const sortedProducts = await tableOperations.sortUp();
    return res.status(200).json(sortedProducts);
  } catch (error) {
    console.error("Error sorteerimisel:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const sortDown = async (req, res) => {
  try {
    const sortedProducts = await tableOperations.sortDown();
    return res.status(200).json(sortedProducts);
  } catch (error) {
    console.error("Error sorteerimisel:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const priceKG = async (req, res) => {
  try {
    const pricePerKG = await tableOperations.priceKG();
    return res.status(200).json(pricePerKG);
  } catch (error) {
    console.error("Error kilohinnaga:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const priceKGSortUp = async (req, res) => {
  try {
    const pricePerKGSortUp = await tableOperations.priceKGsortUp();
    return res.status(200).json(pricePerKGSortUp);
  } catch (error) {
    console.error("Error kilohinna sorteerimisel:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const priceKGSortDown = async (req, res) => {
  try {
    const pricePerKGsortdown = await tableOperations.priceKGsortDown();
    return res.status(200).json(pricePerKGsortdown);
  } catch (error) {
    console.error("Error kilohinna sorteerimisel:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const search = async (req, res) => {
  let { name, price } = req.query;

  name = name ?? "";
  price = parseFloat(price ?? "0");

  if (isNaN(price)) {
    return res.status(400).json({ message: "Invalid price value." });
  }

  price = parseFloat(price);
  try {
    const results = await tableOperations.search(name, price);
    return res.status(200).json(results);
  } catch (error) {
    console.error("Error otsingul:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { Nimetus, Kaal, Hind } = req.body;

  if (!Nimetus || !Kaal || !Hind) {
    return res.status(400).json({ message: "Mõned väljad puudu." });
  }

  try {
    const result = await tableOperations.updateProduct(id, Nimetus, Kaal, Hind);
    return res.status(200).json({
      message: "Muudatused tehtud.",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Error muudatuste tegemisel:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};
