export function Testimonials() {
  return (
    <section className="py-32 bg-bg-dark relative overflow-hidden" id="reviews">
      {/* Background Elements */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="relative overflow-hidden rounded-b-2xl">
          <div className="elfsight-app-6d2f49a5-773a-4336-ac87-68163bd5c353" data-elfsight-app-lazy></div>
          {/* Cover block to hide the Elfsight badge */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-[#0F172A] z-[9999] pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
