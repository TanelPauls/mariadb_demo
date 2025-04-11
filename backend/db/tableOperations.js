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

  static async priceKG() {
    const query = `
          SELECT Nimetus, Kaal, Hind, ROUND(Hind / (Kaal / 1000), 2) AS Kilo_hind FROM TOOTED;
        `;
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error("Error tabelis kilohind: ", error.stack);
      throw error;
    }
  }

  static async priceKGsortDown() {
    const query = `
          SELECT Nimetus, Kaal, Hind, ROUND(Hind / (Kaal / 1000), 2) AS Kilo_hind FROM TOOTED ORDER BY Kilo_hind DESC;
        `;
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error("Error tabeli kilohind sorteerimisel: ", error.stack);
      throw error;
    }
  }

  static async priceKGsortUp() {
    const query = `
          SELECT Nimetus, Kaal, Hind, ROUND(Hind / (Kaal / 1000), 2) AS Kilo_hind FROM TOOTED ORDER BY Kilo_hind ASC;
        `;
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error("Error tabeli kilohind sorteerimisel: ", error.stack);
      throw error;
    }
  }

  static async search(name, price) {
    const query = `
      SELECT Nimetus, Kaal, Hind FROM TOOTED WHERE Nimetus LIKE ? AND Hind > ?;
      `;
    try {
      const nameSearch = `%${name}%`;
      const [rows] = await db.query(query, [nameSearch, price]);
      return rows;
    } catch (error) {
      console.error("Error otsimisel:", error.message);
      throw error;
    }
  }

  static async updateProduct(id, fields) {
    const updates = [];
    const values = [];

    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (updates.length === 0) {
      throw new Error("No valid fields to update.");
    }

    const query = `
  UPDATE TOOTED
  SET ${updates.join(", ")}
  WHERE id = ?;
`;

    values.push(id);

    try {
      const [result] = await db.query(query, values);
      return result;
    } catch (error) {
      console.error("Error updating product:", error.message);
      throw error;
    }
  }
}

export default tableOperations;
