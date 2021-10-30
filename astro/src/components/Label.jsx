export default function Label({ children }) {
  return (
    <p className="text-xs font-mono text-blue-700 dark:text-blue-100 uppercase tracking-widest">
      {children}
    </p>
  );
}
