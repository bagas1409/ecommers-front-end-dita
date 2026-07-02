export default function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-gray-600">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-gray-900">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
