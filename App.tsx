
import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Lock,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

const OFFICIAL_URL = "https://lojaimpulsedigital.com.br";
const REDIRECT_TIME_MS = 2000;

const App: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / REDIRECT_TIME_MS) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        window.location.href = OFFICIAL_URL;
      }
    }, 16); // ~60fps smooth bar

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      {/* Container Principal */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-10 text-center relative overflow-hidden">

        {/* Glow de fundo sutil */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-green-50 rounded-full blur-3xl opacity-50"></div>

        {/* Ícone de Sucesso */}
        <div className="mb-6 relative inline-block">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <CheckCircle2 size={48} strokeWidth={1.5} className="animate-[scaleIn_0.5s_ease-out]" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-sm border border-slate-100">
            <ShieldCheck size={16} className="text-blue-600" />
          </div>
        </div>

        {/* Textos de Agradecimento */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
          Obrigado pela confiança!
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Sua solicitação foi processada. Estamos redirecionando você para o nosso ambiente seguro de ofertas.
        </p>

        {/* Barra de Progresso */}
        <div className="space-y-3 mb-8">
          <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-1">
              <Lock size={10} /> Conexão Segura
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-75 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Rodapé Interno */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-tight">
              Acesso Autorizado: ImpulseGram Official
            </span>
          </div>

          <a
            href={OFFICIAL_URL}
            className="text-blue-600 text-xs font-medium hover:underline flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
          >
            Não foi redirecionado? Clique aqui <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Selos de Segurança no Rodapé da Página */}
      <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale">
        <div className="flex items-center gap-1.5">
          <ShieldAlert size={14} />
          <span className="text-[10px] font-bold uppercase">SSL Secured</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock size={14} />
          <span className="text-[10px] font-bold uppercase">Safe Browsing</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scaleIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default App;
