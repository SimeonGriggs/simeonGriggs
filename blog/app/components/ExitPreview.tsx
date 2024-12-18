export default function ExitPreview() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex h-screen w-screen items-end justify-center">
      <form className="pointer-events-auto" action="/resource/preview" method="POST">
        <button className="bg-red-500 p-4 rounded-full my-4 font-bold text-white" type="submit">
          Exit Preview Mode
        </button>
      </form>
    </div>
  )
}
