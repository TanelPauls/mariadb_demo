import tableOperations from "../db/tableOperations.js";
import CreateTables from "../db/initTables.js";
import fetchAndInsert from "../db/loadDataURLLiik.js";
import fetchAndInsertTootja from "../db/loadDataURLTootja.js";
import fetchAndInsertTooted from "../db/loadDataURLTooted.js";
import { db } from "../db/connectMariaDB.js";

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
