type Ps5Prop = {
  MouseEnter?: () => void;
  MouseLeave?: () => void;
};

export function Ps5Icon({ MouseEnter, MouseLeave }: Ps5Prop) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      className="text-violet-700"
      onMouseEnter={MouseEnter}
      onMouseLeave={MouseLeave}
    >
      <title>PlayStation 5</title>
      <path
        fill="currentColor"
        d="M23.797 9.42h-7.348v1.992s-.022.769.929.769h4.491a1.3 1.3 90 0 1 .512.104c.251.112.533.34.533.799c0 .412-.2.646-.397.777a1 1 90 0 1-.55.16H16.45v.559h6.153S24 14.523 24 13.087c0-.73-.427-1.092-.81-1.27a1.9 1.9 90 0 0-.79-.171h-4.452a.45.45 90 0 1-.214-.05a.38.38 0 0 1-.2-.356V9.972h6.263ZM7.2 14.019v.559h3.119a1.55 1.55 90 0 0 1.018-.369a1.29 1.29 90 0 0 .454-1.012V10.82a.86.86 90 0 1 .32-.679a.8.8 90 0 1 .503-.17h2.72V9.42h-3.239s-1.397.022-1.397 1.5v2.22a.96.96 90 0 1-.142.515a.75.75 90 0 1-.667.365ZM0 9.42v.552h5.559a1.05 1.05 90 0 1 .448.096c.22.103.468.316.468.748a.765.765 0 0 1-.468.732a1.1 1.1 90 0 1-.455.098H1.429a1.6 1.6 90 0 0-.705.16c-.343.172-.724.577-.724 1.246v1.522h1.07v-1.516a.8.8 90 0 1 .052-.287c.088-.227.312-.59.834-.59h4.157a1.5 1.5 90 0 0 .413-.055c.382-.11 1.019-.423 1.019-1.31c0-1.38-1.373-1.396-1.373-1.396Z"
      />
    </svg>
  );
}