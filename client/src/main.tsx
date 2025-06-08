import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// RADOS Quantum System - Enterprise Production Edition
// © 2025 Ervin Remus Radosavlevici
// All Rights Reserved

console.log(`
╔══════════════════════════════════════════════════════════════╗
║                  RADOS QUANTUM SYSTEM                       ║
║              Enterprise Production Edition                   ║
║                                                              ║
║  © 2025 Ervin Remus Radosavlevici                           ║
║  Emails: ervin210@sky.com, radosavlevici.ervin@gmail.com,   ║
║          ervin210@icloud.com                                 ║
║  All Rights Reserved - Unauthorized Use Prohibited          ║
║                                                              ║
║  Version: 3.0.0-ENTERPRISE                                  ║
║  Build: PRODUCTION-8M-FEATURES                              ║
╚══════════════════════════════════════════════════════════════╝
`);

createRoot(document.getElementById("root")!).render(<App />);
