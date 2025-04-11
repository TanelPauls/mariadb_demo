import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const endpoints = [
  {
    label:
      "1. Kuvada toodete nimetused, kaalud ja hinnad ning järjestada tooted hinna järgi kahanevalt.",
    value: "/unsorted",
  },
  {
    label:
      "2. Kuvada toodete nimetused, kaalud, hinnad ning toote ühe kilogrammi hind.",
    value: "/pricePerKG",
  },
  {
    label:
      "3. Kuvada kõik tooted, mille nimetus sisaldab sõna leib ja mis maksab üle 2 euro. Lisaks toote nimetusele väljasta ka kaal ja hind.",
    value: "/search",
  },

  { label: "Top 3 leiba & saia", value: "/mostexpensive" },
  { label: "Kõige odavam leib & sai", value: "/cheapest" },
];

export default function ProductViewer() {
  const [selectedEndpoint, setSelectedEndpoint] = useState("/search");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchName, setSearchName] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  useEffect(() => {
    if (selectedEndpoint === "/search") {
      setSearchName("");
      setSearchPrice("");
      fetchData(`/search?name=&price=0`);
    }
  }, [selectedEndpoint]);

  const fetchData = async (endpoint) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:3013${endpoint}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("Viga andmete laadimisel.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSortDirection = (direction) => {
    if (!selectedEndpoint) return;

    const base = selectedEndpoint.replace("/", "");
    let newEndpoint = "";

    if (["unsorted", "sortup", "sortdown"].includes(base)) {
      newEndpoint = direction === "up" ? "/sortup" : "/sortdown";
    } else if (
      ["pricePerKG", "pricePerKGsortUp", "pricePerKGsortDown"].includes(base)
    ) {
      newEndpoint =
        direction === "up" ? "/pricePerKGsortUp" : "/pricePerKGsortDown";
    } else {
      newEndpoint = "/unsorted"; // fallback
    }

    setSelectedEndpoint(newEndpoint);
    fetchData(newEndpoint);
  };

  const sortableColumnsByEndpoint = {
    unsorted: "Hind",
    sortup: "Hind",
    sortdown: "Hind",
    pricePerKG: "Kilo_hind",
    pricePerKGsortUp: "Kilo_hind",
    pricePerKGsortDown: "Kilo_hind",
  };

  const renderTable = () => {
    if (data.length === 0) return <p>Andmeid ei leitud.</p>;

    const headers = Object.keys(data[0]);

    return (
      <table
        style={{ borderCollapse: "collapse", marginTop: 20, width: "100%" }}
      >
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>
                {h}
                {sortableColumnsByEndpoint[
                  selectedEndpoint.replace("/", "")
                ] === h && (
                  <>
                    <FaArrowUp
                      style={{
                        marginLeft: 5,
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => handleSortDirection("up")}
                    />
                    <FaArrowDown
                      style={{
                        marginLeft: 5,
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => handleSortDirection("down")}
                    />
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {headers.map((key) => (
                <td
                  key={key}
                  style={{ border: "1px solid #ccc", padding: "8px" }}
                >
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Vali andmed</h2>
      <select
        value={selectedEndpoint}
        onChange={(e) => {
          const value = e.target.value;
          setSelectedEndpoint(value);
          if (value && value !== "/search") {
            fetchData(value);
          }
        }}
        style={{ padding: "8px", marginBottom: "10px", minWidth: "250px" }}
      >
        <option value="">-- Vali päring --</option>
        {endpoints.map((ep) => (
          <option key={ep.value} value={ep.value}>
            {ep.label}
          </option>
        ))}
      </select>
      {selectedEndpoint === "/search" && (
        <div style={{ marginTop: 10, marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Nimetus sisaldab..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ marginRight: 10, padding: "6px" }}
          />
          <input
            type="number"
            placeholder="Hind üle..."
            value={searchPrice}
            onChange={(e) => setSearchPrice(e.target.value)}
            style={{ marginRight: 10, padding: "6px" }}
          />
          <button
            onClick={() =>
              fetchData(`/search?name=${searchName}&price=${searchPrice || 0}`)
            }
            style={{ padding: "6px 12px" }}
          >
            Otsi
          </button>
        </div>
      )}

      {loading && <p>Laen andmeid...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {renderTable()}
    </div>
  );
}
