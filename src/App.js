import React, { useState } from "react";

// START DATA: all names as strings
const initialData = {
  Creatives: ['Aarav', 'Aditya Keshri', 'Aditya KS', 'Aman', 'Deeya', 'Divya', 'Hansika', 'Kripa', 'Kishore', 'Arushi', 'Naitik', 'Niranjan', 'Pragya', 'Subhalakshmi', 'Tanmay', 'Yash', 'Yathi', 'Sanjai', 'Supreet'],
  Technicals: ['Aditya Kumar', 'Aniket', 'Ashwin', 'Daniel', 'Diya', 'Manasvi', 'Meghana', 'Sameer', 'Sharanya', 'Sree Vardhan'],
  "Corporate Relations": ['K.V Sri Vatsa', 'Aarya', 'Thushaar', 'Kirthi', 'Archi', 'Chuli', 'Srish', 'John'],
  Documentation: ['Mohith', 'Samridhi', 'Zain', 'Vinay', 'Swastika', 'Theeksha', 'Nithi'],
  Secretary: ['Aniket', 'Deepan', 'Ekta', 'Narayan', 'Nutan', 'Sukanya'],
};

const departmentColors = {
  Creatives: "#FFCD3C",
  Technicals: "#8ACB88",
  "Corporate Relations": "#4682B4",
  Documentation: "#E77F67",
};
const secretaryColor = "#C2185B";

// --- Responsive styles and helpers
const sectionBoxStyle = {
  background: "#FFFBEA",
  border: "2px solid #FFD700",
  borderRadius: 12,
  padding: 10,
  minWidth: 220,
  maxWidth: 340,
  minHeight: 180,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  marginBottom: 20,
  // Removed height and overflow to allow the box to grow!
};

const namesRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  justifyContent: "center",
  width: "100%",
  marginTop: 8,
};

const departmentDisplayOrder = [
  "Secretary",    // always on top
  "Creatives",
  "Technicals",
  "Corporate Relations",
  "Documentation"
];

function App() {
  // Section state: always alphabetically sorted
  const [sections, setSections] = useState(() => {
    const out = {};
    for (const [dept, names] of Object.entries(initialData)) {
      out[dept] = [...names].sort((a, b) => a.localeCompare(b));
    }
    return out;
  });
  const [presentToday, setPresentToday] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("11:40");
  const [endTime, setEndTime] = useState();

  const isSecretary = name => initialData.Secretary.includes(name);

  const getDepartmentForName = name =>
    Object.keys(initialData).find(
      dept => dept !== "Secretary" && initialData[dept].includes(name)
    );

  // --- Click handlers ---
  const handleNameClick = (name, section) => {
    setSections(prev => ({
      ...prev,
      [section]: prev[section].filter(n => n !== name),
    }));
    setPresentToday(prev =>
      [...prev, name].filter((x, i, arr) => arr.indexOf(x) === i).sort((a, b) => a.localeCompare(b))
    );
  };
  const handlePresentNameClick = name => {
    let foundDept = Object.entries(initialData).find(
      ([section, names]) =>
        section !== "Secretary" &&
        names.includes(name)
    );
    const deptToPut =
      foundDept?.[0] || (isSecretary(name) ? "Secretary" : "Creatives");
    setSections(prev => ({
      ...prev,
      [deptToPut]: [...prev[deptToPut], name].sort((a, b) => a.localeCompare(b)),
    }));
    setPresentToday(prev => prev.filter(n => n !== name));
  };
  const handleReset = () => {
    const out = {};
    for (const [dept, names] of Object.entries(initialData)) {
      out[dept] = [...names].sort((a, b) => a.localeCompare(b));
    }
    setSections(out);
    setPresentToday([]);
    setDate(new Date().toISOString().split("T")[0]);
    setStartTime("11:40");
    setEndTime();
  };

  // Attendance calculations
  const departmentAttendance = Object.keys(departmentColors).map(dept => {
    const total = initialData[dept].length;
    const present = initialData[dept].filter(name => presentToday.includes(name)).length;
    const percent = total === 0 ? 0 : Math.round((present / total) * 100);
    return { dept, present, total, percent };
  });
  const overallTotal = departmentAttendance.reduce((sum, d) => sum + d.total, 0);
  const overallPresent = departmentAttendance.reduce((sum, d) => sum + d.present, 0);
  const overallPercent = overallTotal === 0 ? 0 : Math.round((overallPresent / overallTotal) * 100);

  // Organize Members Present By Department for Minutes Message
  const membersByDept = {};

  // Secretaries present (sorted)
  membersByDept.Secretary = presentToday
    .filter(n => isSecretary(n))
    .sort((a, b) => a.localeCompare(b));

  // Each department
  Object.keys(departmentColors).forEach(dept => {
    membersByDept[dept] = presentToday
      .filter(name => getDepartmentForName(name) === dept && !isSecretary(name))
      .sort((a, b) => a.localeCompare(b));
  });

  // Build department-wise member section for minutes (skip empty depts)
  const membersPresentBlock =
    departmentDisplayOrder
      .map(dept =>
        membersByDept[dept] && membersByDept[dept].length > 0
          ? `${dept}: ${membersByDept[dept].join(", ")}`
          : null
      )
      .filter(Boolean)
      .join("\n");

  const minutesText = `
Minutes of the Meeting

Date: ${new Date(date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}
Time: ${startTime} to ${endTime}

Members Present:
${membersPresentBlock}

Teacher Coordinators: Unofficial Meeting

Discussions took place-
1. 
2. 
`.trim();

  // --- Copy to clipboard ---
  const copyToClipboard = () => {
    navigator.clipboard.writeText(minutesText).then(
      () => alert("Minutes message copied to clipboard!"),
      () => alert("Failed to copy. Please try manually.")
    );
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #FFFBEA 0%, #FFE066 100%)",
        color: "#22223B",
        minWidth: "100vw",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        padding: 0,
        userSelect: "none",
      }}
    >
      <h1 style={{ textAlign: "center", margin: "24px 0 12px 0" }}>ANTARAL Minutes</h1>
      {/* Section boxes */}
      <div
        style={{
          display: "flex",
          gap: 18,
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 10px",
        }}
      >
        {Object.entries(sections).map(([section, names]) => (
          <div key={section} style={{ ...sectionBoxStyle, width: "100%", maxWidth: 340 }}>
            <h2
              style={{
                borderBottom: "1px solid #FFD700",
                textAlign: "center",
                width: "100%",
                margin: "0 0 4px 0"
              }}
            >
              {section}
            </h2>
            <div style={namesRowStyle}>
              {names.map(name => (
                <div
                  key={name + "-" + section}
                  style={{
                    background:
                      section === "Secretary"
                        ? secretaryColor
                        : departmentColors[section] || "#FFD700",
                    color: section === "Secretary" ? "#FFF" : "#22223B",
                    borderRadius: 6,
                    padding: "8px 14px",
                    cursor: "pointer",
                    fontWeight: section === "Secretary" ? "bold" : 500,
                    textAlign: "center",
                    minWidth: 90,
                    marginBottom: 2,
                    boxShadow:
                      section === "Secretary"
                        ? "0 0 8px 2px #C2185B33"
                        : "0 2px 4px #FFD70033",
                    userSelect: "none",
                  }}
                  onClick={() => handleNameClick(name, section)}
                  title="Mark as Present"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Present Today */}
      <div
        style={{
          margin: "32px auto 0 auto",
          background: "#22223B",
          color: "#FFD700",
          borderRadius: 14,
          padding: 20,
          minHeight: 80,
          maxWidth: 600,
        }}
      >
        <h2 style={{ textAlign: "center" }}><i>Present Today</i></h2>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
            maxHeight: 120,
            overflowY: "auto",
          }}
        >
          {presentToday.map(name => {
            const isSec = isSecretary(name);
            const dept = getDepartmentForName(name);
            const color = isSec
              ? secretaryColor
              : departmentColors[dept] || "#FFD700";
            const textColor = isSec ? "#FFF" : "#22223B";
            return (
              <div
                key={name + "-present"}
                style={{
                  background: color,
                  color: textColor,
                  borderRadius: 6,
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontWeight: isSec ? "bold" : 500,
                  margin: "2px 4px",
                  userSelect: "none"
                }}
                onClick={() => handlePresentNameClick(name)}
                title="Remove from Present"
              >
                {name}
              </div>
            );
          })}
        </div>
      </div>

      {/* ATTENDANCE SECTION */}
      <div
        style={{
          margin: "28px auto 0 auto",
          background: "#E9FCCE",
          border: "2px solid #8ACB88",
          borderRadius: 10,
          maxWidth: 440,
          padding: 20,
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ marginBottom: 16, textAlign: "center", color: "#22223B" }}>
          <span style={{ fontWeight: 700 }}>Attendance</span>
        </h2>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          fontSize: 16,
        }}>
          {departmentAttendance.map(({ dept, present, total, percent }) => (
            <div
              key={dept}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: departmentColors[dept],
                borderRadius: 5,
                padding: "4px 10px",
                color: "#22223B",
                fontWeight: 600
              }}
            >
              <span>{dept}</span>
              <span>
                {total === 0 ? (
                  <span style={{ fontWeight: 400, color: "#777" }}>No members</span>
                ) : (
                  <>
                    {present} / {total} &nbsp;
                    <span style={{ fontWeight: 700 }}>{percent}%</span>
                  </>
                )}
              </span>
            </div>
          ))}
          {/* OVERALL */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#FFD700",
              borderRadius: 5,
              padding: "4px 10px 4px 10px",
              mixBlendMode: "multiply",
              color: "#22223B",
              fontWeight: 700,
              borderTop: "2px solid #AAA",
              marginTop: 8
            }}
          >
            <span>Overall</span>
            <span>
              {overallTotal === 0
                ? <span style={{ fontWeight: 400, color: "#777" }}>No members</span>
                : <>
                  {overallPresent} / {overallTotal} &nbsp;
                  <span>{overallPercent}%</span>
                </>
              }
            </span>
          </div>
        </div>
      </div>

      {/* Minutes Message */}
      <div
        style={{
          marginTop: 32,
          background: "#FFFBEA",
          borderRadius: 10,
          border: "2px solid #22223B",
          padding: 24,
          position: "relative",
          maxWidth: 650,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Minutes Message</h2>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <label>
            Date:{" "}
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={{ cursor: "pointer" }}
            />
          </label>
          <label style={{ marginLeft: 20 }}>
            Start Time:{" "}
            <input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              style={{ cursor: "pointer" }}
            />
          </label>
          <label style={{ marginLeft: 20 }}>
            End Time:{" "}
            <input
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              style={{ cursor: "pointer" }}
            />
          </label>
        </div>
        <pre
          id="minutesMessageBox"
          style={{
            marginTop: 16,
            background: "#FFF",
            border: "1px solid #FFD700",
            padding: 10,
            borderRadius: 6,
            whiteSpace: "pre-wrap",
            maxHeight: 300,
            overflowY: "auto",
            userSelect: "text",
            fontFamily: "inherit",
            fontSize: 15,
          }}
        >
          {minutesText}
        </pre>
        <button
          onClick={copyToClipboard}
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            background: "#FFD700",
            color: "#22223B",
            fontWeight: "bold",
            border: "none",
            borderRadius: 6,
            padding: "6px 14px",
            cursor: "pointer",
            userSelect: "none"
          }}
          title="Copy minutes message to clipboard"
        >
          Copy
        </button>
      </div>

      {/* Reset Button */}
      <div style={{ textAlign: "center" }}>
        <button
          style={{
            background: "#FFD700",
            color: "#22223B",
            fontWeight: "bold",
            border: "none",
            borderRadius: 6,
            marginTop: 32,
            padding: "10px 30px",
            fontSize: 18,
            boxShadow: "0 1px 7px #FFD70033",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={handleReset}
          title="Reset all selections and date/time"
        >
          Reset All
        </button>
      </div>

      {/* --- Responsive styles --- */}
      <style>
        {`
        @media (max-width: 800px) {
          .section-box { min-width: 90vw !important; max-width: 98vw !important; height: auto !important;}
        }
        @media (max-width: 600px) {
          body, html, #root {padding: 0!important; margin: 0!important;}
          .section-box { min-width: 94vw !important; max-width: 99vw !important; height: auto !important;}
        }
        `}
      </style>
    </div>
  );
}

export default App;
