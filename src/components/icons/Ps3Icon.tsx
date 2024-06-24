type Ps3Prop = {
  MouseEnter?: () => void;
  MouseLeave?: () => void;
};

export function Ps3Icon({ MouseEnter, MouseLeave }: Ps3Prop) {
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
      <title>PlayStation 3</title>
      <path
        fill="currentColor"
        d="M6.326 9.33H0v.737h5.985c.38.016.783.226.783.777c0 .55-.395.76-.768.776H1.18c-.047 0-.287.008-.543.132c-.373.186-.583.543-.583.993v1.801h1.01v-1.8c0-.272.162-.435.442-.443h4.502c.582-.008 1.451-.404 1.451-1.46c-.015-1.102-.59-1.505-1.133-1.513m4.72.357a1 1 0 0 0-.234.706v3.175c0 .233-.093.318-.124.35c-.155.147-.419.155-.497.155H7.288v.543h3.393c.163 0 .574-.031.869-.303c.14-.124.302-.365.302-.753v-3.229c0-.038 0-.194.094-.302c.108-.117.295-.14.442-.14h3.152v-.543h-3.65c-.364.023-.652.131-.846.341m12.48 2.243l.055-.046c.271-.264.411-.614.411-1.04c0-1.103-.582-1.506-1.125-1.514h-6.35v.737h6.008c.38.016.784.226.784.777c0 .55-.396.76-.768.776h-6.024v.543h6.008c.31 0 .683.179.683 1.048c0 .551-.396.76-.768.776h-5.915v.683h6.024c.582-.008 1.451-.403 1.451-1.459c0-.536-.14-.963-.411-1.226z"
      />
    </svg>
  );
}