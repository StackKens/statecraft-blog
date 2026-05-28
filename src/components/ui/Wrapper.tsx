export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-10">{children}</section>
  );
}
