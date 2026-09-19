import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UploadCloud, FileText, CheckCircle2, Loader2, Sparkles, BrainCircuit } from "lucide-react"

export function ResumeUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    "Extracting text and structure...",
    "Identifying core skills and competencies...",
    "Mapping experience to internal roles...",
    "Building your AI Talent Profile..."
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startAnalysis = () => {
    if (!file) return;
    setAnalyzing(true);
    
    // Simulate AI analysis steps
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          const userId = localStorage.getItem('userId') || '1';
          navigate(`/employees/${userId}`);
        }, 1000);
      } else {
        setAnalysisStep(currentStep);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-xl w-full z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4 border border-blue-200 shadow-sm">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Let AI Build Your Profile</h1>
          <p className="text-slate-500 text-lg">Upload your resume and we'll instantly extract your skills, experience, and match you with internal opportunities.</p>
        </div>

        {!analyzing ? (
          <div 
            className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all bg-white/80 backdrop-blur-sm shadow-xl ${
              isDragging ? "border-blue-500 bg-blue-50/50" : "border-slate-300 hover:border-slate-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex flex-col items-center">
                <FileText className="w-16 h-16 text-blue-600 mb-4" />
                <p className="text-slate-900 font-medium mb-1">{file.name}</p>
                <p className="text-slate-500 text-sm mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <div className="flex gap-3 w-full">
                  <button onClick={() => setFile(null)} className="flex-1 py-3 px-4 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors shadow-sm">
                    Remove
                  </button>
                  <button onClick={startAnalysis} className="flex-[2] py-3 px-4 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 shadow-md">
                    <BrainCircuit className="w-5 h-5" />
                    Analyze Resume
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                  <UploadCloud className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Drag & Drop your resume</h3>
                <p className="text-slate-500 mb-8 text-sm">Supports PDF, DOCX, or Image (PNG/JPG) up to 10MB</p>
                
                <input 
                  type="file" 
                  id="resume-upload" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                />
                <label 
                  htmlFor="resume-upload" 
                  className="py-3 px-8 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer inline-block shadow-md"
                >
                  Browse Files
                </label>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-slate-100" />
                <div className="w-24 h-24 rounded-full border-4 border-blue-500 border-t-transparent animate-spin absolute top-0 left-0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600">
                  <BrainCircuit className="w-8 h-8 animate-pulse" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4 max-w-sm mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {index < analysisStep ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : index === analysisStep ? (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                  )}
                  <p className={`text-sm font-medium ${index <= analysisStep ? "text-slate-900" : "text-slate-400"}`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
