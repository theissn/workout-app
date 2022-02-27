import Link from "next/link";
import { useRouter } from "next/router";

function isActive(path, name) {
  return (path.includes(name) && name !== '/') || path === name;
}

export default function NavLink({ children, name }) {
  const router = useRouter();

  return (
    <Link href={`${name}`}>
      <a
        className={`w-1/3 text-white ${
          isActive(router.pathname, name) ? "bg-blue-400" : ""
        }`}
      >
        <div className="text-center flex flex-col items-center">{children}</div>
      </a>
    </Link>
  );
}
