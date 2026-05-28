interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function Wrapper({ children, className = "" }: WrapperProps) {
  return (
    <section className={`w-full px-4 md:px-8 lg:px-16 py-10  ${className}`}>
      {children}
    </section>
  );
}
