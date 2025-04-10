import tableOperations from "../db/tableOperations.js";
import CreateTables from "../db/initTables.js";

export const resetDB = async (req, res) => {
  try {
    await tableOperations.dropTableTOOTED();
    await tableOperations.dropTableTOOTJA();
    await tableOperations.dropTableLIIK();
    await CreateTables.createTableTOOTJA();
    await CreateTables.createTableLIIK();
    await CreateTables.createTableTOOTED();

    res.status(200).json({ message: "Databaas edukalt resetitud." });
  } catch (error) {
    console.error("Error in resetDB controller:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};
