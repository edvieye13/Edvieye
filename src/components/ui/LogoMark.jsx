function LogoMark({ label = 'Edvieye', className = '', glow = true }) {
  return (
    <div className={`flex items-center gap-2 ${className}`.trim()}>
      <div
        className={`relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue ${
          glow ? 'neon-glow' : ''
        }`}
      >
        <span className="font-bold text-background">E</span>
      </div>
      <span className="font-semibold tracking-tight text-foreground">{label}</span>
    </div>
  );
}

export default LogoMark;

