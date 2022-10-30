export const RenderFunction = ({
  children,
}: {
  children: () => JSX.Element | null;
}) => children();
