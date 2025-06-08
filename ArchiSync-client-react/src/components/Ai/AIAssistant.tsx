// import AIChat from "./AIChat"

// const AIAssistant = () => {
  

//   return (
//     <div className="ai-assistant-page">
//       <div className="page-header">
//         <h1>AI Assistant</h1>
//       </div>

//       <div className="ai-assistant-content">
//         <AIChat />

//         <div className="ai-help-panel">
//           <h3>How can I help?</h3>
//           <ul className="help-options">
//             <li className="help-option">
//               <button>Generate design ideas</button>
//             </li>
//             <li className="help-option">
//               <button>Calculate project estimates</button>
//             </li>
//             <li className="help-option">
//               <button>Suggest materials</button>
//             </li>
//             <li className="help-option">
//               <button>Analyze floor plans</button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AIAssistant
import { useState } from "react";
import AIChat from "./AIChat";

const AIAssistant = () => {
  const [prompt, setPrompt] = useState("");

  const handleOptionClick = (text: string) => {
    setPrompt(text);
  };

  return (
    <div className="ai-assistant-page">
      <div className="page-header">
        <h1>AI Assistant</h1>
      </div>

      <div className="ai-assistant-content" style={{ display: "flex", gap: "20px" }}>
        <AIChat prompt={prompt} setPrompt={setPrompt} />

        <div className="ai-help-panel">
          <h3>How can I help?</h3>
          <ul className="help-options">
            <li className="help-option">
              <button onClick={() => handleOptionClick("Generate design ideas")}>Generate design ideas</button>
            </li>
            <li className="help-option">
              <button onClick={() => handleOptionClick("Calculate project estimates")}>Calculate project estimates</button>
            </li>
            <li className="help-option">
              <button onClick={() => handleOptionClick("Suggest materials")}>Suggest materials</button>
            </li>
            <li className="help-option">
              <button onClick={() => handleOptionClick("Analyze floor plans")}>Analyze floor plans</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
