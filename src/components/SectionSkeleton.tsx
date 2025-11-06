export const SectionSkeleton = () => {
  return (
    <section className="py-8 md:py-10 lg:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header skeleton */}
          <div className="text-center mb-6 md:mb-12 lg:mb-16 animate-pulse">
            <div className="h-12 md:h-16 bg-muted/30 rounded-lg w-3/4 mx-auto mb-4" />
            <div className="h-6 md:h-8 bg-muted/20 rounded-lg w-2/3 mx-auto" />
          </div>
          
          {/* Content skeleton */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 animate-pulse">
            <div className="h-48 bg-muted/30 rounded-xl" />
            <div className="h-48 bg-muted/30 rounded-xl" />
            <div className="h-48 bg-muted/30 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
