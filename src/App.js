import React, { useState } from "react";

// Complete data with member name, user-friendly display name, USN and department
const membersData = [
  // Secretary
  { name: "Narayan", displayName: "Narayan", usn: "23BCR00260", department: "Secretary" },
  { name: "Sukanya", displayName: "Sukanya", usn: "23BCR00791", department: "Secretary" },
  { name: "Aniket", displayName: "Aniket", usn: "23BCR00191", department: "Secretary" },
  { name: "Deepan", displayName: "Deepan", usn: "23BCR00448", department: "Secretary" },
  { name: "Nutan", displayName: "Nutan", usn: "23BCR00842", department: "Secretary" },
  { name: "Ekta", displayName: "Ekta", usn: "23BMSR0207", department: "Secretary" },

  // Creatives
  { name: "Aarav", displayName: "Aarav", usn: "23BMSR0160", department: "Creatives" },
  { name: "Aditya Keshri", displayName: "Aditya Keshri", usn: "JUUG25BCOMP30649", department: "Creatives" },
  { name: "Aditya KS", displayName: "Aditya KS", usn: "23BMSR0166", department: "Creatives" },
  { name: "Aman", displayName: "Aman", usn: "JUUG25BCOMH35409", department: "Creatives" },
  { name: "Arushi", displayName: "Arushi", usn: "23BMSR0187", department: "Creatives" },
  { name: "Deeya", displayName: "Deeya", usn: "24BCR00449", department: "Creatives" },
  { name: "Divya", displayName: "Divya", usn: "JUUG25BCOMH20284", department: "Creatives" },
  { name: "Hansika", displayName: "Hansika", usn: "24BCR00354", department: "Creatives" },
  { name: "Kishore", displayName: "Kishore", usn: "JUUG25BMS33797", department: "Creatives" },
  { name: "Kripa", displayName: "Kripa", usn: "23BMSR0178", department: "Creatives" },
  { name: "Madhur", displayName: "Madhur", usn: "23BMSR0115", department: "Creatives" },
  { name: "Niranjan", displayName: "Niranjan", usn: "23BMSR0188", department: "Creatives" },
  { name: "Prarthana", displayName: "Prarthana", usn: "24BCR00154", department: "Creatives" },
  { name: "Sanjai", displayName: "Sanjai", usn: "JUUG25BCOMH16951", department: "Creatives" },
  { name: "Subhalakshmi", displayName: "Subhalakshmi", usn: "23BCR00789", department: "Creatives" },
  { name: "Supreet", displayName: "Supreet", usn: "JUUG25BCOMP29163", department: "Creatives" },
  { name: "Yash", displayName: "Yash", usn: "JUUG25BCOMP31005", department: "Creatives" },
  { name: "Yathi", displayName: "Yathi", usn: "23BMSR0202", department: "Creatives" },

  // Technicals
  { name: "Aditya Kumar", displayName: "Aditya Kumar", usn: "JUUG25BCOM30683", department: "Technicals" },
  { name: "Ashwin", displayName: "Ashwin", usn: "24BCR00796", department: "Technicals" },
  { name: "Daniel", displayName: "Daniel", usn: "23BMSR0100", department: "Technicals" },
  { name: "Manasvi", displayName: "Manasvi", usn: "JUUG25BCOMH24503", department: "Technicals" },
  { name: "Meghana", displayName: "Meghana", usn: "24BCR00824", department: "Technicals" },
  { name: "Sameer", displayName: "Sameer", usn: "24BCR00167", department: "Technicals" },
  { name: "Sharanya", displayName: "Sharanya", usn: "JUUG25BCOMH23526", department: "Technicals" },
  { name: "Sree Vardhan", displayName: "Sree Vardhan", usn: "23BMSR0202", department: "Technicals" },

  // Corporate Relations
  { name: "Aarya", displayName: "Aarya", usn: "24BMSRO109", department: "Corporate Relations" },
  { name: "Chuli", displayName: "Chuli", usn: "23BMSR0379", department: "Corporate Relations" },
  { name: "Harshini", displayName: "Harshini", usn: "JUUG25BCOM23884", department: "Corporate Relations" },
  { name: "K.V Sri Vatsa", displayName: "K.V Sri Vatsa", usn: "23BMSR0357", department: "Corporate Relations" },
  { name: "Kamakshi", displayName: "Kamakshi", usn: "", department: "Corporate Relations" }, // Add USN if available
  { name: "Kirthi", displayName: "Kirthi", usn: "JUUG25BCOM23884", department: "Corporate Relations" }, // Add USN if available
  { name: "Thushaar", displayName: "Thushaar", usn: "24BCR00835", department: "Corporate Relations" },

  // Documentation
  { name: "Mohith", displayName: "Mohith", usn: "24BCR00416", department: "Documentation" },
  { name: "Nithi", displayName: "Nithi", usn: "JUUGI202510277", department: "Documentation" },
  { name: "Samridhi", displayName: "Samridhi", usn: "JUUG25BCOMH27339", department: "Documentation" },
  { name: "Swastika", displayName: "Swastika", usn: "JUUG25BCOMH15355", department: "Documentation" },
  { name: "Theeksha", displayName: "Theeksha", usn: "JUUG25BCOMH13132", department: "Documentation" },
  { name: "Vinay", displayName: "Vinay", usn: "23BCR00284", department: "Documentation" },
  { name: "Zain", displayName: "Zain", usn: "JUUG24BMSR0133", department: "Documentation" },
];

// Department colors as before ...
const departmentColors = {
  Creatives: "#FFCD3C",
  Technicals: "#8ACB88",
  "Corporate Relations": "#4682B4",
  Documentation: "#E77F67",
};
const secretaryColor = "#C2185B";

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
  "Secretary",
  "Creatives",
  "Technicals",
  "Corporate Relations",
  "Documentation",
];

function App() {
  // We'll manage sections as arrays of name strings to keep UI simple
  const [sections, setSections] = React.useState(() => {
    const out = {};
    departmentDisplayOrder.forEach((dept) => {
      out[dept] = membersData
        .filter((m) => m.department === dept)
        .map((m) => m.name)
        .sort((a, b) => a.localeCompare(b));
    });
    return out;
  });

  const [presentToday, setPresentToday] = React.useState([]);
  const [date, setDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = React.useState("11:40");
  const [endTime, setEndTime] = React.useState("");

  // Helper to check secretary membership
  const isSecretary = (name) =>
    membersData.find(
      (m) => m.name === name && m.department === "Secretary"
    ) !== undefined;

  // Get department for a given name
  const getDepartmentForName = (name) => {
    const member = membersData.find((m) => m.name === name);
    return member ? member.department : null;
  };

  // Click handlers for toggling presence
  const handleNameClick = (name, section) => {
    setSections((prev) => ({
      ...prev,
      [section]: prev[section].filter((n) => n !== name),
    }));
    setPresentToday((prev) =>
      [...prev, name]
        .filter((x, i, arr) => arr.indexOf(x) === i)
        .sort((a, b) => a.localeCompare(b))
    );
  };
  const handlePresentNameClick = (name) => {
    const dept = getDepartmentForName(name) || "Creatives";
    setSections((prev) => ({
      ...prev,
      [dept]: [...prev[dept], name].sort((a, b) => a.localeCompare(b)),
    }));
    setPresentToday((prev) => prev.filter((n) => n !== name));
  };

  const handleReset = () => {
    const out = {};
    departmentDisplayOrder.forEach((dept) => {
      out[dept] = membersData
        .filter((m) => m.department === dept)
        .map((m) => m.name)
        .sort((a, b) => a.localeCompare(b));
    });
    setSections(out);
    setPresentToday([]);
    setDate(new Date().toISOString().split("T")[0]);
    setStartTime("11:40");
    setEndTime("");
  };

  // Attendance calculations
  const departmentAttendance = departmentDisplayOrder
    .filter((d) => d !== "Secretary")
    .map((dept) => {
      const total = membersData.filter((m) => m.department === dept).length;
      const present = presentToday.filter(
        (name) => getDepartmentForName(name) === dept
      ).length;
      const percent = total === 0 ? 0 : Math.round((present / total) * 100);
      return { dept, present, total, percent };
    });
  const overallTotal = departmentAttendance.reduce((sum, d) => sum + d.total, 0);
  const overallPresent = departmentAttendance.reduce((sum, d) => sum + d.present, 0);
  const overallPercent = overallTotal === 0 ? 0 : Math.round((overallPresent / overallTotal) * 100);

  // Build members present by department with secretaries prioritized
  const prioritySecretaries = ["Narayan", "Sukanya"];
  const membersByDept = {};

  membersByDept.Secretary = presentToday
    .filter((n) => isSecretary(n))
    .sort((a, b) => {
      if (
        prioritySecretaries.includes(a) &&
        prioritySecretaries.includes(b)
      ) {
        return prioritySecretaries.indexOf(a) - prioritySecretaries.indexOf(b);
      }
      if (prioritySecretaries.includes(a)) return -1;
      if (prioritySecretaries.includes(b)) return 1;
      return a.localeCompare(b);
    });

  departmentDisplayOrder
    .filter(d => d !== "Secretary")
    .forEach((dept) => {
      membersByDept[dept] = presentToday
        .filter((name) => getDepartmentForName(name) === dept)
        .sort((a, b) => a.localeCompare(b));
    });

  // Format members for minutes message
  const membersPresentBlock = departmentDisplayOrder
    .map((dept) =>
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

  // CSV download section

  const prepareCSVData = (membersList) => {
    const header = "Name,USN,Department\n";
    const rows = membersList
      .map((name) => {
        const m = membersData.find((mem) => mem.name === name);
        if (!m) return null;
        return `"${m.displayName}","${m.usn}","${m.department}"`;
      })
      .filter(Boolean)
      .join("\n");
    return header + rows;
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", filename);
    tempLink.click();
    URL.revokeObjectURL(url);
  };

  const exportPresentCSV = () => {
    const csv = prepareCSVData(presentToday);
    downloadCSV(csv, "present_members.csv");
  };

  const exportAbsentCSV = () => {
    const allNames = membersData.map((m) => m.name);
    const absent = allNames.filter((name) => !presentToday.includes(name));
    const csv = prepareCSVData(absent);
    downloadCSV(csv, "absent_members.csv");
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

      {/* Department Boxes */}
      <div
        style={{
          display: "flex",
          gap: 18,
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 10px",
        }}
      >
        {departmentDisplayOrder.map((section) => (
          <div
            key={section}
            style={{ ...sectionBoxStyle, width: "100%", maxWidth: 340 }}
            className="section-box"
          >
            <h2
              style={{
                borderBottom: "1px solid #FFD700",
                textAlign: "center",
                width: "100%",
                margin: "0 0 4px 0",
              }}
            >
              {section}
            </h2>
            <div style={namesRowStyle}>
              {sections[section]?.map((name) => {
                const bgColor = section === "Secretary" ? secretaryColor : departmentColors[section] || "#FFD700";
                const textColor = section === "Secretary" ? "#FFF" : "#22223B";
                return (
                  <div
                    key={name + "-" + section}
                    style={{
                      background: bgColor,
                      color: textColor,
                      borderRadius: 6,
                      padding: "8px 14px",
                      cursor: "pointer",
                      fontWeight: section === "Secretary" ? "bold" : 500,
                      textAlign: "center",
                      minWidth: 90,
                      marginBottom: 2,
                      boxShadow: section === "Secretary" ? "0 0 8px 2px #C2185B33" : "0 2px 4px #FFD70033",
                      userSelect: "none",
                    }}
                    onClick={() => handleNameClick(name, section)}
                    title="Mark as Present"
                  >
                    {name}
                  </div>
                );
              })}
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
        <h2 style={{ textAlign: "center" }}>
          <i>Present Today</i>
        </h2>
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
          {presentToday.map((name) => {
            const isSec = isSecretary(name);
            const dept = getDepartmentForName(name);
            const color = isSec ? secretaryColor : departmentColors[dept] || "#FFD700";
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
                  userSelect: "none",
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

      {/* CSV button design */}
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <button 
          onClick={exportPresentCSV} 
          style={{ 
            marginRight: 10, 
            padding: "8px 16px",
            background: "#FFD700",    // same golden yellow
            color: "#22223B",         // dark text
            fontWeight: "bold",
            border: "none",
            borderRadius: 6,
            boxShadow: "0 1px 7px #FFD70033",
            cursor: "pointer",
            userSelect: "none",
            transition: "background 0.3s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#FFDF54")}
            onMouseLeave={e => (e.currentTarget.style.background = "#FFD700")}
            title="Download CSV of present members"
          >
            Export Present Members CSV
        </button>

        <button 
          onClick={exportAbsentCSV} 
          style={{ 
            padding: "10px 20px",
            background: "#FFD700",
            color: "#22223B",
            fontWeight: "bold",
            border: "none",
            borderRadius: 6,
            boxShadow: "0 1px 7px #FFD70033",
            cursor: "pointer",
            userSelect: "none",
            transition: "background 0.3s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#FFDF54")}
            onMouseLeave={e => (e.currentTarget.style.background = "#FFD700")}
            title="Download CSV of absent members"  
          >
          Export Absent Members CSV
        </button>
      </div>

      {/* Attendance Section */}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            fontSize: 16,
          }}
        >
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
                fontWeight: 600,
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
              marginTop: 8,
            }}
          >
            <span>Overall</span>
            <span>
              {overallTotal === 0 ? (
                <span style={{ fontWeight: 400, color: "#777" }}>No members</span>
              ) : (
                <>
                  {overallPresent} / {overallTotal} &nbsp;
                  <span>{overallPercent}%</span>
                </>
              )}
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
              onChange={(e) => setDate(e.target.value)}
              style={{ cursor: "pointer" }}
            />
          </label>
          <label style={{ marginLeft: 20 }}>
            Start Time:{" "}
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{ cursor: "pointer" }}
            />
          </label>
          <label style={{ marginLeft: 20 }}>
            End Time:{" "}
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
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
          onClick={() => {
            navigator.clipboard.writeText(minutesText).then(() => alert("Copied!"));
          }}
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
            userSelect: "none",
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

      {/* Responsive */}
      <style>{`
        @media (max-width: 800px) {
          .section-box { min-width: 90vw !important; max-width: 98vw !important; height: auto !important;}
        }
        @media (max-width: 600px) {
          body, html, #root {padding: 0 !important; margin: 0 !important;}
          .section-box { min-width: 94vw !important; max-width: 99vw !important; height: auto !important;}
        }
      `}</style>
    </div>
  );
}

export default App;
