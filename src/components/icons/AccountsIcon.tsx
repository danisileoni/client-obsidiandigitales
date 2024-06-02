type AccountsProps = {
  MouseEnter?: () => void;
  MouseLeave?: () => void;
};

export function AccountsIcon({ MouseEnter, MouseLeave }: AccountsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.1em"
      height="1.1em"
      viewBox="0 0 24 24"
      className="text-violet-700"
      onMouseEnter={MouseEnter}
      onMouseLeave={MouseLeave}
    >
      <title>Cuenta</title>
      <path
        fill="currentColor"
        d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"
      />
    </svg>
  );
}
