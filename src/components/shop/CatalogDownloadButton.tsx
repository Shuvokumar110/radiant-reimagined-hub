import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";

const CATALOG_LINK = "https://drive.google.com/file/d/1V4FtVVC8s1QgytQwGWUlc42flUWOhUM-/view?usp=drivesdk";

export function CatalogDownloadButton() {
  return (
    <motion.a
      href={CATALOG_LINK}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex items-center gap-3 px-6 py-3.5 md:px-8 md:py-4 bg-foreground text-background font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Animated shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-background/15 to-transparent" />
      
      <Download className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
      <div className="text-left">
        <span className="block text-sm md:text-base leading-tight">Download 2026 Catalog</span>
        <span className="block text-[10px] md:text-xs opacity-70 leading-tight">View full product range</span>
      </div>
      <ExternalLink className="w-4 h-4 opacity-50 shrink-0" />
    </motion.a>
  );
}

export function CatalogDownloadBanner() {
  return (
    <section className="py-6 md:py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-foreground rounded-2xl p-5 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-background font-bold text-lg md:text-xl">
              TiDi Sports 2026 Catalog
            </h3>
            <p className="text-background/60 text-xs md:text-sm mt-1">
              Browse our complete range of team wear, boots, and custom gear
            </p>
          </div>
          <motion.a
            href={CATALOG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3 bg-background text-foreground font-bold rounded-xl hover:bg-background/90 transition-all duration-300 shrink-0"
          >
            <Download className="w-5 h-5" />
            <span className="text-sm md:text-base">Download Catalog</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
