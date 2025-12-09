export default function Divider() {
  return (
    <div className="flex items-center">
      <div aria-hidden="true" className="w-full border-t border-gray-300 dark:border-white/15" />
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-[14px] text-black dark:bg-gray-900 dark:text-black font-inter w-max">
          o continua con
        </span>
      </div>
      <div aria-hidden="true" className="w-full border-t border-gray-300 dark:border-white/15" />
    </div>
  )
}
