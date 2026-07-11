"use client";

import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Premium UI States
  const [isDragging, setIsDragging] = useState(false);
  const [loadingText, setLoadingText] = useState("Confirm Import");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI Processing Theater: Cycles text when processing
  useEffect(() => {
    if (!isProcessing) {
      setLoadingText("Confirm Import");
      return;
    }
    const steps = ["Reading CSV...", "Extracting entities...", "Mapping CRM rules...", "Finalizing..."];
    let stepIndex = 0;
    setLoadingText(steps[0]);
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setLoadingText(steps[stepIndex]);
    }, 350); 
    
    return () => clearInterval(interval);
  }, [isProcessing]);

  // Reusable file processor
  const processFile = (uploadedFile: File) => {
    setFile(uploadedFile);
    setResults(null); 
    
    Papa.parse(uploadedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors.length > 0) console.warn("PapaParse noticed some row errors:", result.errors);
        setHeaders(result.meta.fields || []);
        setPreviewData(result.data);
      },
      error: (error) => {
        console.error("PapaParse Fatal Error:", error);
        alert("Failed to read the file. Check the browser console.");
      }
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) processFile(uploadedFile);
    if (event.target) event.target.value = "";
  };

  // Drag & Drop Handlers
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv"))) {
      processFile(droppedFile);
    } else {
      alert("Please drop a valid .csv file.");
    }
  };

  // Trigger Backend AI Processing
  const handleConfirmImport = async () => {
    if (previewData.length === 0) return;
    setIsProcessing(true);

    try {
      const response = await fetch("http://localhost:5000/api/import-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ records: previewData }),
      });

      const data = await response.json();

      if (!response.ok || data.error) throw new Error(data.error || "Server responded with an error.");
      setResults(data);
    } catch (error: any) {
      console.error("Import failed:", error);
      alert(`Backend Error: ${error.message}\nCheck your backend terminal for details.`);
      setResults(null);
    } finally {
      setIsProcessing(false);
    }
  };

  // Dynamic CRM Status Badge Generator (Optimized for Light & Dark Mode)
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "GOOD_LEAD_FOLLOW_UP": return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700/50";
      case "SALE_DONE": return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700/50";
      case "BAD_LEAD": return "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-700/50";
      case "DID_NOT_CONNECT": return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700/50";
      default: return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600";
    }
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      {/* Premium Animated Gradient Background */}
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-950 dark:via-gray-900 dark:to-indigo-950 text-gray-900 dark:text-gray-100 transition-colors duration-500 font-sans p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header Section with Glassmorphism */}
          <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-xl shadow-indigo-100/20 dark:shadow-none border border-white/50 dark:border-slate-700/50 flex flex-col md:flex-row items-center justify-between transition-all duration-500">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-300 mb-1">
                GrowEasy Data Hub
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">
                Intelligently extract and map leads using Google Gemini.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-indigo-50/80 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-100 dark:border-indigo-800/50">
                AI Powered
              </span>
              
              {/* Dark/Light Mode Toggle */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-600"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  // Sun Icon
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 4.22a1 1 0 011.415 0l.708.708a1 1 0 01-1.414 1.414l-.708-.708a1 1 0 010-1.414zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-4.22 4.22a1 1 0 010 1.415l-.708.708a1 1 0 01-1.414-1.414l.708-.708a1 1 0 011.414 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-4.22a1 1 0 010-1.415l-.708-.708a1 1 0 01-1.414 1.414l.708.708a1 1 0 011.414 0zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm4.22-4.22a1 1 0 011.415 0l.708.708a1 1 0 01-1.414 1.414l-.708-.708a1 1 0 010-1.414zM10 5a5 5 0 100 10 5 5 0 000-10z" clipRule="evenodd" />
                  </svg>
                ) : (
                  // Moon Icon
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </header>

          {/* Step 1: Premium Drag & Drop Area */}
          {!results && (
            <section className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl shadow-indigo-100/20 dark:shadow-none border border-white/50 dark:border-slate-700/50 transition-all duration-500">
              <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Step 1: Upload Raw Data</h2>
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ease-out
                  ${isDragging 
                    ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 scale-[1.02]" 
                    : "border-gray-300 dark:border-slate-600 hover:border-indigo-400 hover:bg-white/50 dark:hover:bg-slate-800/50"}`}
              >
                <input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                <svg className={`w-14 h-14 mb-4 transition-colors duration-300 ${isDragging ? "text-indigo-500" : "text-gray-400 dark:text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {isDragging ? "Drop your CSV right here!" : "Drag & drop your CSV file here"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">or click to browse your computer</p>
              </div>
            </section>
          )}

          {/* Step 2: High-End Preview Table */}
          {previewData.length > 0 && !results && (
            <section className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl shadow-indigo-100/20 dark:shadow-none border border-white/50 dark:border-slate-700/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Step 2: Verify & Extract</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Review your raw data before passing it to the AI engine.</p>
                </div>
                
                <button
                  onClick={handleConfirmImport}
                  disabled={isProcessing}
                  className={`relative px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 overflow-hidden shadow-md
                    ${isProcessing 
                      ? "bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-600 bg-[length:200%_100%] animate-[pulse_2s_ease-in-out_infinite] shadow-indigo-500/40 cursor-not-allowed" 
                      : "bg-gray-900 dark:bg-indigo-600 hover:bg-gray-800 dark:hover:bg-indigo-500 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isProcessing && (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {loadingText}
                  </span>
                </button>
              </div>
              
              <div className={`overflow-auto max-h-[400px] border border-gray-200 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-900 transition-all duration-500 ${isProcessing ? "opacity-40 blur-[1.5px] pointer-events-none" : ""}`}>
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50/90 dark:bg-slate-800/90 backdrop-blur-sm sticky top-0 border-b border-gray-200 dark:border-slate-700 z-10">
                    <tr>
                      {headers.map((header, idx) => (
                        <th key={idx} className="px-6 py-4 font-bold tracking-wider whitespace-nowrap">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                    {previewData.slice(0, 50).map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/50 transition-colors duration-150">
                        {headers.map((header, hIdx) => (
                          <td key={hIdx} className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                            {row[header] || <span className="text-gray-300 dark:text-gray-600">-</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {previewData.length > 50 && (
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center font-medium">
                  Showing first 50 rows of {previewData.length.toLocaleString()} total rows.
                </div>
              )}
            </section>
          )}

          {/* Step 3: Final Results & Dynamic Badges */}
          {results && (
            <section className="space-y-6 animate-in zoom-in-95 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg shadow-emerald-100/20 dark:shadow-none border border-white/50 dark:border-slate-700/50 flex flex-col justify-center items-start border-l-4 border-l-emerald-500">
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Imported</p>
                  <div className="flex items-baseline gap-3 mt-1">
                    <p className="text-5xl font-black text-gray-900 dark:text-white">{results.metrics.totalImported}</p>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-700/50">Success</p>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg shadow-rose-100/20 dark:shadow-none border border-white/50 dark:border-slate-700/50 flex flex-col justify-center items-start border-l-4 border-l-rose-500">
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Skipped</p>
                  <div className="flex items-baseline gap-3 mt-1">
                    <p className="text-5xl font-black text-gray-900 dark:text-white">{results.metrics.totalSkipped}</p>
                    {results.metrics.totalSkipped > 0 && (
                      <p className="text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/40 px-2.5 py-1 rounded-md border border-rose-200 dark:border-rose-700/50">Missing Data</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl shadow-indigo-100/20 dark:shadow-none border border-white/50 dark:border-slate-700/50 overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h2 className="text-xl font-extrabold text-gray-800 dark:text-white">Structured CRM Output</h2>
                  <button 
                    onClick={() => { setResults(null); setFile(null); setPreviewData([]); }}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800/50"
                  >
                    + Process Another File
                  </button>
                </div>

                <div className="overflow-auto max-h-[500px] border border-gray-200 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-900 shadow-inner">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50/90 dark:bg-slate-800/90 sticky top-0 border-b border-gray-200 dark:border-slate-700 z-10 backdrop-blur-sm">
                      <tr>
                        <th className="px-6 py-4 font-extrabold tracking-wider">Status</th>
                        <th className="px-6 py-4 font-extrabold tracking-wider">Name</th>
                        <th className="px-6 py-4 font-extrabold tracking-wider">Contact</th>
                        <th className="px-6 py-4 font-extrabold tracking-wider">CRM Status</th>
                        <th className="px-6 py-4 font-extrabold tracking-wider">Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                      {results.records.map((record: any, idx: number) => (
                        <tr key={idx} className={`group hover:-translate-y-[1px] hover:shadow-sm transition-all duration-200 ${record.skipped ? "bg-rose-50/30 dark:bg-rose-900/10" : "bg-white dark:bg-slate-900 hover:bg-gray-50/50 dark:hover:bg-slate-800/50"}`}>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-md text-xs font-bold border ${record.skipped ? "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-800" : "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800"}`}>
                              {record.skipped ? "Skipped" : "Imported"}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">{record.data.name || "-"}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-gray-900 dark:text-gray-200 font-medium">{record.data.email || "-"}</span>
                              <span className="font-mono text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {record.data.mobile_without_country_code ? `${record.data.country_code || ''} ${record.data.mobile_without_country_code}` : "-"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {record.data.crm_status ? (
                              <span className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide border shadow-sm ${getStatusBadge(record.data.crm_status)}`}>
                                {record.data.crm_status.replace(/_/g, ' ')}
                              </span>
                            ) : "-"}
                          </td>
                          <td className="px-6 py-4 max-w-xs text-gray-600 dark:text-gray-400 truncate" title={record.data.crm_note}>{record.data.crm_note || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}