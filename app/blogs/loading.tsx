export default function PublicBlogsLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12 animate-pulse">
        {/* Hero Header Skeleton */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="w-40 h-6 mx-auto rounded-full bg-slate-200" />
          <div className="w-3/4 h-12 mx-auto rounded-2xl bg-slate-200" />
          <div className="w-1/2 h-6 mx-auto rounded-xl bg-slate-200" />
        </div>

        {/* Featured Skeleton */}
        <div className="w-full h-[400px] rounded-3xl bg-slate-200" />

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="h-96 rounded-2xl bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
