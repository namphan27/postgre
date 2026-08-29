
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-w-[80%] mx-auto mb-[5%]">{children}</div>
    </>
  );
}
