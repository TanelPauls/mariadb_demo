import { db } from "./connectMariaDB.js";

class tableOperations {
  static async dropTableTOOTED() {
    const query = `
          DROP TABLE IF EXISTS TOOTED;
        `;
    try {
      await db.query(query);
    } catch (error) {
      console.error("Error droping table TOOTED:", error.stack);
      throw error;
    }
  }
  static async dropTableTOOTJA() {
    const query = `
          DROP TABLE IF EXISTS TOOTJA;
        `;
    try {
      await db.query(query);
    } catch (error) {
      console.error("Error droping table TOOTJA:", error.stack);
      throw error;
    }
  }
  static async dropTableLIIK() {
    const query = `
          DROP TABLE IF EXISTS LIIK;
        `;
    try {
      await db.query(query);
    } catch (error) {
      console.error("Error droping table LIIK:", error.stack);
      throw error;
    }
  }
}

export default tableOperations;
