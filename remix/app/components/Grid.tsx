export default function Grid() {
  return (
    <div className="pointer-events-none fixed inset-0 w-screen h-screen grid grid-cols-6 md:grid-cols-12 lg:grid-cols-16">
      <div className="border-r border-red-500" />
      <div className="border-r border-red-500" />
      <div className="border-r border-red-500" />
      <div className="border-r border-red-500" />
      <div className="border-r border-red-500" />
      <div className="border-r border-red-500" />
      <div className="border-r border-red-500 hidden md:block" />
      <div className="border-r border-red-500 hidden md:block" />
      <div className="border-r border-red-500 hidden md:block" />
      <div className="border-r border-red-500 hidden md:block" />
      <div className="border-r border-red-500 hidden md:block" />
      <div className="border-r border-red-500 hidden md:block" />
      <div className="border-r border-red-500 hidden lg:block" />
      <div className="border-r border-red-500 hidden lg:block" />
      <div className="border-r border-red-500 hidden lg:block" />
      <div className="border-red-500 hidden lg:block" />
    </div>
  )
}
