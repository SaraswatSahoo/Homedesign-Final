export default function Services() {
  const icons = [
    { src: "/icons/kitchen.svg", label: "Modular Kitchen" },
    { src: "/icons/bedroom.svg", label: "Bedroom" },
    { src: "/icons/sofa.svg", label: "Sofa" },
    { src: "/icons/lights.svg", label: "Lights" },
    { src: "/icons/wallpaper.svg", label: "Wallpaper" },
    { src: "/icons/wall-painting.svg", label: "Wall Paint" },
    { src: "/icons/crockery.svg", label: "Crockery Units" },
    { src: "/icons/bathroom.svg", label: "Bathroom" },
  ];

  return (
    <section className="w-full py-16 bg-gray-50 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-10">
        End-to-End Interior Solutions
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 px-8">
        {icons.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={item.src} alt={item.label} className="w-16 h-16 mb-3" />
            <p className="text-gray-700 text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}