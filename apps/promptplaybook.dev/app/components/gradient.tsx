import {clsx} from 'clsx'

export function Gradient({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        // 'bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] sm:bg-linear-145',
        'bg-linear-115 from-28% sm:bg-linear-145 from-cyan-50 via-blue-500 via-70% to-teal-500',
      )}
    />
  )
}

export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={clsx(
          'w-xl absolute -right-60 -top-44 h-60 transform-gpu md:right-0',
          // 'bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff]',
          'bg-linear-115 from-28% from-cyan-50 via-blue-500 via-70% to-teal-500',
          'rotate-[-10deg] rounded-full blur-3xl',
        )}
      />
    </div>
  )
}
