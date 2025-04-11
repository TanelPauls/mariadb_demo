import { db } from "./connectMariaDB.js";

class tableOperations {
  static async dropTableTOOTED() {
    const query = `
          DROP TABLE IF EXISTS TOOTED;
        `;
    try {
      await db.query(query);
    } catch (error) {
      console.error("Error tabeli TOOTED kustutamisel:", error.stack);
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
      console.error("Error tabeli TOOTJA kustutamisel:", error.stack);
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
      console.error("Error tabeli LIIK kustutamisel:", error.stack);
      throw error;
    }
  }
  static async sortUp() {
    const query = `
          SELECT Nimetus, Kaal, Hind FROM TOOTED ORDER BY Hind ASC;
        `;
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error("Error tabeli sorteerimisel: ", error.stack);
      throw error;
    }
  }

  static async sortDown() {
    const query = `
          SELECT Nimetus, Kaal, Hind FROM TOOTED ORDER BY Hind DESC;
        `;
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error("Error tabeli sorteerimisel: ", error.stack);
      throw error;
    }
  }
}

export default tableOperations;
