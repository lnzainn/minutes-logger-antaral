import React from "react";

// Complete data with member name, user-friendly display name, USN and department
const membersData = [
  // Secretary
  { name: "Swaroop Patra", displayName: "Swaroop", usn: "24BMSR0238", department: "Secretary" },
  { name: "Aarya Agarwal", displayName: "Aarya", usn: "24BMSR0109", department: "Secretary" },
  { name: "Bablu Kumar Shah", displayName: "Bablu", usn: "24BMSR0257", department: "Secretary" },
  { name: "Sameer Kumble", displayName: "Sameer", usn: "24BCR00167", department: "Secretary" },
  { name: "A Hansika Rani Patro", displayName: "Hansika", usn: "24BCR00897", department: "Secretary" },
  { name: "Thushaar Nallani", displayName: "Thushaar", usn: "24BCR00835", department: "Secretary" },

  // Creatives
  { name: "Divya", displayName: "Divya", usn: "25BCR00039", department: "Creatives" },
  { name: "Kishore MR", displayName: "Kishore", usn: "25BMSR0261", department: "Creatives" },
  { name: "Hasyya Mathre", displayName: "Hasyya", usn: "25BMSR0087", department: "Creatives" },
  { name: "Pranjal C", displayName: "Pranjal", usn: "24BMSR0230", department: "Creatives" },
  { name: "Vandana Shree HN", displayName: "Vandana", usn: "25BCR00252", department: "Creatives" },
  { name: "Apoorva KV", displayName: "Apoorva", usn: "25BCAR0569", department: "Creatives" },
  { name: "Deep Agarwal", displayName: "Deep", usn: "24BMSR0145", department: "Creatives" },
  { name: "Devesh Periwal", displayName: "Devesh", usn: "25BCR00333", department: "Creatives" },
  { name: "Vedant Ladha", displayName: "Vedant", usn: "25BCR00457", department: "Creatives" },

  // Technicals
  { name: "Kanishk Jain", displayName: "Kanishk", usn: "24BMSR0223", department: "Technicals" },
  { name: "Sharanya BS", displayName: "Sharanya", usn: "25BCR00047", department: "Technicals" },
  { name: "K Aniket Senapati", displayName: "Aniket", usn: "JCJ25001963", department: "Technicals" },
  { name: "Garvit Arora", displayName: "Garvit", usn: "24BCR00475", department: "Technicals" },
  { name: "Harsheel Dhariwal", displayName: "Harsheel", usn: "25BCR00759", department: "Technicals" },
  { name: "Chinmay S", displayName: "Chinmay", usn: "25BCR00504", department: "Technicals" },

  // Corporate Relations
  { name: "Sriya Guntha", displayName: "Sriya", usn: "24BMSR0131", department: "Corporate Relations" },
  { name: "Kirthi Jain", displayName: "Kirthi", usn: "25BCR00809", department: "Corporate Relations" },
  { name: "Nandini Agarwal", displayName: "Nandini", usn: "25BCR00820", department: "Corporate Relations" },

  // Documentation
  { name: "Theeksha Pavan", displayName: "Theeksha", usn: "25BCR00248", department: "Documentation" },
  { name: "Samridhi Bhardwaj", displayName: "Samridhi", usn: "25BCR00046", department: "Documentation" },
  { name: "Nithi Loganathan", displayName: "Nithi", usn: "25BCR00736", department: "Documentation" },
  { name: "Aseel", displayName: "Aseel", usn: "25BMSR0149", department: "Documentation" },
  { name: "Tania Ravindra", displayName: "Tania", usn: "25BCR00243", department: "Documentation" },
  { name: "Devansh Baheti", displayName: "Devansh", usn: "24BMSR0089", department: "Documentation" },
  { name: "Samyuktha Badri", displayName: "Samyuktha", usn: "25BCR00135", department: "Documentation" },
  { name: "Mrinal Muthamma C S", displayName: "Mrinal", usn: "25BCR00554", department: "Documentation" },
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
  const prioritySecretaries = [
  "Aarya Agarwal",
  "Swaroop Patra"];
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
  .map((dept) => {
    if (!membersByDept[dept] || membersByDept[dept].length === 0) return null;

    let members = membersByDept[dept]
      .map((name) => membersData.find((m) => m.name === name))
      .filter(Boolean);

    if (dept === "Secretary") {
      const priority = ["Aarya", "Swaroop"];

      members.sort((a, b) => {
        const aPriority = priority.indexOf(a.displayName);
        const bPriority = priority.indexOf(b.displayName);

        if (aPriority !== -1 && bPriority !== -1) {
          return aPriority - bPriority;
        }
        if (aPriority !== -1) return -1;
        if (bPriority !== -1) return 1;

        return a.displayName.localeCompare(b.displayName);
      });
    } else {
      members.sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
      );
    }

    return `${dept}: ${members
      .map((m) => m.displayName)
      .join(", ")}`;
  })
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
