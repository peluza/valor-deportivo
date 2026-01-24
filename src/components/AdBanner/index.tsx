import React from 'react';

interface AdBannerProps {
    className?: string;
    slot?: string;
    format?: 'auto' | 'fluid' | 'rectangle';
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '', slot = 'default', format = 'auto' }) => {
    return (
        <div className={`w-full bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden p-4 flex flex-col items-center justify-center text-center ${className}`}>
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-mono">Publicidad</div>
            <div className="w-full h-32 md:h-24 bg-slate-800/30 rounded-lg border border-dashed border-slate-700 flex items-center justify-center animate-pulse">
                <span className="text-slate-600 font-medium text-sm">Espacio para Anuncio ({format})</span>
            </div>
            {/* 
        Here you would typically insert the Google AdSense code or other ad provider script.
        Example:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slot}
             data-ad-format={format}
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      */}
        </div>
    );
};

export default AdBanner;
